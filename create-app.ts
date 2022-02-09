/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */
import yaml from 'js-yaml';
import TOML, { JsonMap } from '@iarna/toml';
import chalk from 'chalk';
import ora from 'ora';
import { stripIndents } from 'common-tags';
import cpy from 'cpy';
import fs from 'fs';
import { outputFile, readFile } from 'fs-extra';
import globby from 'globby';
import micromatch from 'micromatch';
import mkdirp from 'mkdirp';
import os from 'os';
import path from 'path';
import { tryGitInit } from './helpers/git';
import { install } from './helpers/install';
import { isFolderEmpty } from './helpers/is-folder-empty';
import { isWriteable } from './helpers/is-writeable';
import { makeDir } from './helpers/make-dir';
import { runMigrations } from './helpers/migrate';
import { getDependencies } from './helpers/partial';
import { ask, confirm, Answers } from './helpers/prompts';
import { loadTemplate } from './helpers/template';
import { binCheck } from './helpers/bin-check';
import compareVersions from 'compare-versions';

export class DownloadError extends Error {}

export async function createApp({ appPath }: { appPath: string }): Promise<void> {
  const template = 'site';
  let templateDir = '';

  console.log();
  const templateSpinner = ora({prefixText:`Fetching latest boilerplate:`}).start();
  try {
    templateDir = await loadTemplate();
    templateSpinner.succeed();
  } catch (error) {
    templateSpinner.fail();
    console.log(error);
    console.log(chalk.red('Sorry, you need read permissions to private jvm repositories'));
    process.exit(1);
  }
  
  const requirementsSpinner = ora({prefixText:`Checking system requirements:`}).start();
  const hugo = await binCheck('hugo', ['version']);
  if (!hugo) {
    requirementsSpinner.fail();
    console.error(chalk.red('Hugo not found. You need to install Hugo in order to use WEKit.'));
    console.error('See https://gohugo.io/getting-started/installing/');
    process.exit(1);
  } else {
    const [hugoVersion] = /v[\d.]+/.exec(hugo) || [];
    if (compareVersions(hugoVersion, '0.91.0') < 0 || !/\+extended/.test(hugo)) {
      requirementsSpinner.fail();
      console.error(stripIndents`${chalk.red('The installed hugo version does not meet the minimum requirements for WEKit.')}
                               You need ${chalk.cyan('Hugo >= v0.91.0+extended')} to use WEKit. See https://gohugo.io/getting-started/installing/`);
      process.exit(1);
    }
  }

  requirementsSpinner.succeed();

  const cwdMigrations = path.join(templateDir, 'contentful/migrations');
  const cwdContent = path.join(templateDir, 'ui/content');
  const cwdData = path.join(templateDir, 'ui/data');
  const cwdUi = path.join(templateDir, 'ui/layouts/partials');

  const migrationsAvailable = await globby('**/*.{cjs,js}', {
    cwd: cwdMigrations,
  });
  const contentAvailable = await globby('**/*.md', {
    cwd: cwdContent,
  });
  const dataAvailable = await globby('**/*', {
    cwd: cwdData,
  });
  const uiAvailable = await globby(['{components,modules,templates}/**/*'], {
    cwd: cwdUi,
  });

  const ui = uiAvailable.reduce<{ [x: string]: string[] }>((result, file) => {
    const type = path.dirname(file);
    const name = path.basename(file, '.html');
    if (type.includes('/')) {
      return result;
    }

    const group: string[] = result?.[type] ?? [];
    return { ...result, [type]: [...group, name] };
  }, {});

  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    );
    console.error('It is likely you do not have write permissions for this folder.');
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const originalDirectory = process.cwd();

  const displayedCommand = 'npm';
  console.log(`Creating a new Contentful HUGO app in ${chalk.green(root)}.`);
  console.log();

  await makeDir(root);
  process.chdir(root);

  // Add .env
  let args:Answers;
  try {
    args = await ask(ui);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    } else if (typeof error === 'string') {
      console.error(chalk.red(error));
    }
    process.exit(1);
  }
  
  const uiDependencies = await getDependencies(uiAvailable.map((file) => path.join(cwdUi, file)));
  const patterns = Object.entries(args?.ui ?? {}).flatMap(([type, entries]) =>
    entries.flatMap((entry) => {
      const { [`${type}/${entry}`]: dependencies = [] } = uiDependencies;
      return [
        `**/${type}/${entry}.html`,
        `**/${entry}/**`,
        `**/*${entry}*.{cjs,js}`,
        ...dependencies.flatMap((dependency) => [
          `**/${dependency.type}/${dependency.entry}.html`,
          `**/${dependency.entry}/**`,
          `**/*${dependency.entry}*.{cjs,js}`,
        ]),
      ];
    })
  );

  const uiFiles = micromatch(uiAvailable, patterns);
  const migrationFiles = micromatch(migrationsAvailable, ['core/*', ...patterns]);
  const contentFiles = micromatch(contentAvailable, ['docs/**/*', ...patterns]);
  const dataFiles = micromatch(dataAvailable, patterns);

  const envContent = stripIndents`
    CONTENTFUL_SPACE_ID = '${args.spaceId}'
    CONTENTFUL_DELIVERY_TOKEN = '${args.deliveryToken}'
    CONTENTFUL_PREVIEW_TOKEN = '${args.previewToken}'

    # Override default environment id (master)
    CONTENTFUL_ENVIRONMENT_ID = '${args.environmentId}'

    # To get the preview content (draft) set this to 'true'
    CONTENTFUL_USE_PREVIEW = 'false'
  `;

  /**
   * Write it to disk.
   */
  fs.writeFileSync(path.join(root, '.env'), envContent);

  /**
   * Create a package.json for the new project.
   */
  const packageJson = {
    name: appName,
    private: true,
    browserslist: ['defaults'],
    scripts: {
      clean: 'del resources public "data/*" "!data/storybook"',
      precontent: 'npm run clean',
      content: 'cssg fetch',
      prestart: 'npm run content',
      start: 'hugo server --disableFastRender',
      prebuild: 'npm run content',
      build: 'hugo --gc --minify --environment production',
      scaffold: 'node tools/hygen scaffold new',
      'storybook:build': 'hugo --gc --environment storybook --watch',
      'storybook:run': 'start-storybook -p 6006',
      prestorybook: 'run-s clean cf:docs',
      storybook: 'run-p storybook:build storybook:run',
      'prebuild-storybook': 'npm run clean && hugo --gc --environment storybook',
      'build-storybook': 'build-storybook',
      'debug:i18n': 'hugo --i18n-warnings | grep i18n',
      'lint:js':
        "eslint --ext .js,.ts --fix --ignore-path .gitignore . --ignore-pattern '*.stories.js'",
      'lint:styles': 'stylelint "assets/scss/**/*.{css,sass,scss,sss,less}"',
      test: 'npm run lint:js && npm run lint:styles',
      'lh:install': 'cd tools/lighthouse && npm install',
      'lh:start': 'cd tools/lighthouse && npm run start',
      'lh:report': 'cd tools/lighthouse && npm run report',
      'cf:login': 'contentful login',
      'cf:docs': 'migrations doc -e master -p docs/contentful --template contentful-docs.js',
    },
    migrations: {
      storage: 'content',
      migrationContentTypeId: 'contentful-migrations',
      directory: 'contentful/migrations',
    },
  };

  /**
   * Write it to disk.
   */
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);

  /**
   * These flags will be passed to `install()`.
   */
  const installFlags = {};
  /**
   * Default dependencies.
   */
  const dependencies = [
    '@fullhuman/postcss-purgecss',
    'autoprefixer',
    'container-query-polyfill',
    'generate-template-files',
    'postcss',
    'postcss-cli',
    'purgecss-whitelister',
  ];

  /**
   * Default devDependencies.
   */
  const devDependencies = [
    '@babel/core',
    '@jungvonmatt/contentful-fakes',
    '@jungvonmatt/contentful-migrations',
    '@jungvonmatt/contentful-ssg',
    '@jungvonmatt/cssg-plugin-assets',
    '@jungvonmatt/cssg-plugin-hugo',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/builder-webpack5',
    '@storybook/addon-docs',
    '@storybook/html',
    '@storybook/manager-webpack5',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'babel-loader',
    'contentful-cli',
    'copy-webpack-plugin',
    'del-cli',
    'enquirer',
    'eslint',
    'eslint-config-prettier',
    'eslint-config-xo',
    'eslint-config-xo-space',
    'eslint-config-xo-typescript',
    'eslint-plugin-prettier',
    'fs-extra',
    'dotenv',
    'husky',
    'hygen',
    'markdown-table',
    'npm-run-all',
    'picocolors',
    'prettier',
    'prettier-plugin-go-template',
    'pretty-quick',
    'stylelint',
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'ts-dedent',
  ];

  /**
   * Install package.json dependencies if they exist.
   */
  if (dependencies.length) {
    console.log();
    console.log('Installing dependencies:');
    for (const dependency of dependencies) {
      console.log(`- ${chalk.cyan(dependency)}`);
    }
    console.log();

    await install(root, dependencies, installFlags);
  }
  /**
   * Install package.json devDependencies if they exist.
   */
  if (devDependencies.length) {
    console.log();
    console.log('Installing devDependencies:');
    for (const devDependency of devDependencies) {
      console.log(`- ${chalk.cyan(devDependency)}`);
    }
    console.log();

    const devInstallFlags = { devDependencies: true, ...installFlags };
    await install(root, devDependencies, devInstallFlags);
  }
  console.log();

  /**
   * Copy github actions to target directory.
   */
  await cpy(['.github/workflows/**/*'], root, {
    parents: true,
    cwd: templateDir,
  });

  /**
   * Copy tool configurations
   */
  await cpy(['.nvmrc', '.editorconfig', '.eslintrc', '.prettierrc', '.prettierignore'], root, {
    parents: true,
    cwd: templateDir,
  });

  /**
   * Copy the template files to the target directory.
   */
  await cpy(
    [
      '**',
      '.storybook',
      '.gitignore',
      '.env.example',
      '!netlify.toml',
      '!contentful',
      '!data',
      '!content',
      '!.env',
      '!package.json',
      '!package-lock.json',
    ],
    root,
    {
      parents: true,
      cwd: path.join(templateDir, template),
      rename: (name: string) => {
        switch (name) {
          case 'gitignore':
          case 'eslintrc.json': {
            return '.'.concat(name);
          }

          default: {
            return name;
          }
        }
      },
    }
  );

  await cpy(['static/**', 'assets/**', '.stylelintignore', '.stylelintrc'], root, {
    parents: true,
    cwd: path.join(templateDir, 'ui'),
  });

  /**
   * Copy partials to the target directory
   */
  if (uiFiles.length) {
    const dest = path.join(root, 'layouts/partials');
    await mkdirp(dest);
    await cpy(uiFiles, dest, {
      parents: true,
      cwd: cwdUi,
    });
  }

  await outputFile(path.join(root, 'data/.gitkeep'), '');
  await outputFile(path.join(root, 'content/.gitkeep'), '');

  /**
   * Copy migrations to the target directory
   */
  if (migrationFiles.length) {
    const dest = path.join(root, 'contentful/migrations');
    await mkdirp(dest);
    await cpy(migrationFiles, dest, {
      cwd: cwdMigrations,
      parents: false,
    });
  } else {
    await outputFile(path.join(root, 'contentful/migrations/.gitkeep'), '');
  }

  /**
   * Copy contentful ui-extensions to the target directory
   */
  await cpy(['ui-extensions/**'], path.join(root, 'contentful'), {
    parents: true,
    cwd: path.join(templateDir, 'contentful'),
  });

  /**
   * Copy storybook content + data
   */
  if (contentFiles.length) {
    const dest = path.join(root, 'content/storybook');
    await mkdirp(dest);
    await cpy(contentFiles, dest, {
      parents: true,
      cwd: cwdContent,
    });
  }
  if (dataFiles.length) {
    const dest = path.join(root, 'data/storybook');
    await mkdirp(dest);
    await cpy(dataFiles, dest, {
      parents: true,
      cwd: cwdData,
    });
  }

  type KeyValueMap<T = unknown> = Record<string, T>;

  /**
   * Generate hugo config files
   */
  const configFile = path.join(root, 'config/_default/config.yaml');
  // const hugoConfigBase = TOML.parse(await readFile(configFile, 'utf8'));
  // const hugoConfig = TOML.stringify({ ...hugoConfigBase, title: appName });
  const hugoConfigBase = yaml.load(await readFile(configFile, 'utf8')) as KeyValueMap;
  const hugoConfig = yaml.dump({ ...hugoConfigBase, title: appName });
  await outputFile(configFile, hugoConfig);

  /**
   * Generate hugo module config
   */
  await outputFile(
    path.join(root, 'config/_default/module.yaml'),
    yaml.dump({
      imports: [
        {
          path: 'github.com/jungvonmatt/wekit-core',
          mounts: [
            {
              source: 'layouts',
              target: 'layouts',
            },
            {
              source: 'utils',
              target: 'layouts/partials/utils',
            },
          ],
        },
      ],
    })
  );

  await outputFile(
    path.join(root, 'go.mod'),
    stripIndents`
    module github.com/jungvonmatt/${appName}

    go 1.17`
  );

  await outputFile(
    path.join(root, 'netlify.toml'),
    TOML.stringify({
      plugins: [
        {
          package: './tools/netlify-plugin-env-build-overwrites',
          inputs: {
            variable: 'STORYBOOK',
            overwrites: {
              publish: 'storybook-static',
              command: 'npm run build-storybook',
            },
          },
        },
      ],
      build: {
        base: '',
        publish: 'public',
        environment: {
          HUGO_VERSION: '0.91.0',
          GO_VERSION: '1.17',
        },
      },
      context: {
        production: {
          command: 'npm run build -- -b $URL',
        },
        'deploy-preview': {
          command: 'npm run build -- -b $DEPLOY_PRIME_URL',
        },
        'branch-deploy': {
          command: 'npm run build -- -b $DEPLOY_PRIME_URL',
        },
      },
    })
  );

  // Populate variables to docs
  const docs = await globby(['*.md', 'docs/**/*.md'], {
    cwd: root,
  });
  await Promise.all(
    docs.map(async (file) => {
      const content = await readFile(file, 'utf-8');
      const replaced = content.replaceAll('CONTENTFUL-SPACE-ID', args.spaceId);
      return outputFile(file, replaced);
    })
  );

  if (await confirm('Run migrations?', true)) {
    await runMigrations();
    console.log();
  }

  if (tryGitInit(root)) {
    console.log('Initialized a git repository.');
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
  console.log();
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} start`));
  console.log('    Starts the hugo development server.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} run build`));
  console.log('    Builds the app for production.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} run storybook`));
  console.log('    Runs the storybook development environment.');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`);
  console.log();
}
