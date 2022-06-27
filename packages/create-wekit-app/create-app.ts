/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */
import yaml from 'js-yaml';
import TOML from '@iarna/toml';
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
  let rootDir = '';

  let template = 'templates/app';
  let theme = 'templates/theme-default';
  let contentfulMigrationsDir = 'packages/contentful-migrations';
  let contentfulAppsDir = 'packages/contentful-apps';

  console.log();
  const templateSpinner = ora({ prefixText: `Fetching latest boilerplate:` }).start();
  try {
    rootDir = await loadTemplate();
    templateSpinner.succeed();
  } catch (error: unknown) {
    templateSpinner.fail();
    console.log(error);
    console.log(chalk.red('Sorry, you need read permissions to private jvm repositories'));
    process.exit(1);
  }

  const requirementsSpinner = ora({ prefixText: `Checking system requirements:` }).start();
  const hugo = await binCheck('hugo', ['version']);
  if (hugo) {
    const [hugoVersion] = /v[\d.]+/.exec(hugo) || [];
    if (compareVersions(hugoVersion, '0.91.0') < 0 || !hugo.includes('+extended')) {
      requirementsSpinner.fail();
      console.error(stripIndents`${chalk.red(
        'The installed hugo version does not meet the minimum requirements for WEKit.'
      )}
                               You need ${chalk.cyan(
                                 'Hugo >= v0.91.0+extended'
                               )} to use WEKit. See https://gohugo.io/getting-started/installing/`);
      process.exit(1);
    }
  } else {
    requirementsSpinner.fail();
    console.error(chalk.red('Hugo not found. You need to install Hugo in order to use WEKit.'));
    console.error('See https://gohugo.io/getting-started/installing/');
    process.exit(1);
  }

  requirementsSpinner.succeed();

  const cwdApps = path.join(rootDir, contentfulAppsDir);
  const cwdMigrations = path.join(rootDir, contentfulMigrationsDir);
  const cwdContent = path.join(rootDir, `${theme}/content`);
  const cwdData = path.join(rootDir, `${theme}/data`);
  const cwdUi = path.join(rootDir, `${theme}/layouts/partials`);

  const migrationsAvailable = await globby('**/*.{cjs,js}', {
    cwd: cwdMigrations,
  });
  const contentAvailable = await globby('**/*.md', {
    cwd: cwdContent,
  });
  const dataAvailable = await globby('**/*', {
    cwd: cwdData,
  });
  const uiAvailable = await globby(['**/*'], {
    cwd: cwdUi,
  });

  const ui = uiAvailable.reduce<Record<string, string[]>>((result, file) => {
    const type = path.dirname(file);
    const name = path.basename(file, '.html');
    if (type.includes('/')) {
      return result;
    }

    const group: string[] = result?.[type] ?? [];
    return { ...result, [type]: [...group, name] };
  }, {});

  const targetDir = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(targetDir)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    );
    console.error('It is likely you do not have write permissions for this folder.');
    process.exit(1);
  }

  const appName = path.basename(targetDir);

  await makeDir(targetDir);
  if (!isFolderEmpty(targetDir, appName)) {
    process.exit(1);
  }

  const originalDirectory = process.cwd();

  const displayedCommand = 'npm';
  console.log(`Creating a new Contentful HUGO app in ${chalk.green(targetDir)}.`);
  console.log();

  await makeDir(targetDir);
  process.chdir(targetDir);

  // Add .env
  let args: Answers;
  try {
    args = await ask({ modules: ui.modules });

    // Get all required components which involves
    // - components whose names match selected modules
    // - components that doesn't have a corresponding module
    const components =
      ui?.components?.filter((component) => {
        const optional = ui?.modules?.some((mod) => component.startsWith(mod.replace(/^m-/, 'c-')));
        const required = args?.ui?.modules?.some((mod) =>
          component.startsWith(mod.replace(/^m-/, 'c-'))
        );
        return !optional || required;
      }) ?? [];

    // Keep all available ui partials (utils, templates) and add selected modules & components
    args.ui = { ...ui, modules: args?.ui?.modules ?? [], components };
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
        // Include partial dependencies
        ...dependencies.flatMap((dependency) => [
          `**/${dependency.type}/${dependency.entry}.html`,
          `**/${dependency.entry}/**`,
        ]),
      ];
    })
  );

  const uiFiles = micromatch(uiAvailable, patterns);
  const migrationFiles = micromatch(migrationsAvailable, ['core/*', ...patterns]);
  const contentFiles = micromatch(contentAvailable, ['docs/**/*', ...patterns]);
  const dataFiles = micromatch(dataAvailable, patterns);

  const envContent = stripIndents`
    CONTENTFUL_SPACE_ID='${args.spaceId}'
    CONTENTFUL_DELIVERY_TOKEN='${args.deliveryToken}'
    CONTENTFUL_PREVIEW_TOKEN='${args.previewToken}'

    # Override default environment id (master)
    CONTENTFUL_ENVIRONMENT_ID='${args.environmentId}'

    # To get the preview content (draft) set this to 'true'
    CONTENTFUL_USE_PREVIEW=false
  `;

  /**
   * Write it to disk.
   */
  fs.writeFileSync(path.join(targetDir, '.env'), envContent);

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
      'watch:hugo': 'hugo server --watch  --noHTTPCache',
      'watch:content': 'cssg watch',
      watch: 'run-p watch:content watch:hugo',
      scaffold: 'node tools/hygen scaffold new',
      'storybook:build': 'hugo --gc --environment storybook',
      'storybook:watch': 'hugo --gc --environment storybook --watch',
      'storybook:run': 'start-storybook -p 6006',
      prestorybook: 'run-s clean cf:docs cf:argtypes storybook:build',
      storybook: 'run-p storybook:watch storybook:run',
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
      'cf:docs': 'migrations doc -p docs/contentful --template contentful-docs.js',
      'cf:argtypes':
        'migrations doc -p data/contentful/argtypes --template contentful-argtypes.js --extension json',
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
  fs.writeFileSync(
    path.join(targetDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  /**
   * These flags will be passed to `install()`.
   */
  const installFlags = {};
  /**
   * Default dependencies.
   */
  const dependencies = [
    '@fullhuman/postcss-purgecss@4',
    'autoprefixer@10',
    'quicklink',
    'container-query-polyfill',
    'postcss@8',
    'postcss-cli@9',
    'purgecss-whitelister@2',
  ];

  /**
   * Default devDependencies.
   */
  const devDependencies = [
    '@babel/core@7',
    '@jungvonmatt/contentful-fakes',
    '@jungvonmatt/contentful-migrations',
    '@jungvonmatt/contentful-ssg',
    '@jungvonmatt/cssg-plugin-assets',
    '@jungvonmatt/cssg-plugin-hugo',
    '@storybook/addon-a11y@6.4',
    '@storybook/addon-actions@6.4',
    '@storybook/addon-essentials@6.4',
    '@storybook/addon-links@6.4',
    '@storybook/builder-webpack5@6.4',
    '@storybook/addon-docs@6.4',
    '@storybook/html@6.4',
    '@storybook/manager-webpack5@6.4',
    '@typescript-eslint/eslint-plugin@5',
    '@typescript-eslint/parser@5',
    'babel-loader@8',
    'contentful-cli@1',
    'copy-webpack-plugin@10',
    'del-cli@4',
    'dotenv@16',
    'enquirer@2',
    'eslint@8',
    'eslint-config-prettier@8',
    'eslint-config-xo@0.40',
    'eslint-config-xo-space@0.32',
    'eslint-config-xo-typescript@0.50',
    'eslint-plugin-prettier@4',
    'fs-extra@10',
    'husky@7',
    'hygen@6',
    'markdown-table@3',
    'netlify-cli@9',
    'npm-run-all@4',
    'picocolors@1',
    'prettier@2.5',
    'prettier-plugin-go-template',
    'pretty-quick@3',
    'stylelint@14',
    'stylelint-config-standard@25',
    'stylelint-config-standard-scss@3',
    'ts-dedent@2',
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
    await install(targetDir, dependencies, installFlags);
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
    await install(targetDir, devDependencies, devInstallFlags);
  }

  console.log();

  /**
   * Copy github actions to target directory.
   */
  await cpy(['.github/workflows/**/*'], targetDir, {
    parents: true,
    cwd: rootDir,
  });

  /**
   * Copy tool configurations
   */
  await cpy(['.nvmrc', '.editorconfig', '.eslintrc', '.prettierrc', '.prettierignore'], targetDir, {
    parents: true,
    cwd: rootDir,
  });

  /**
   * Copy partials to the target directory
   */
  if (uiFiles.length) {
    const dest = path.join(targetDir, 'layouts/partials');
    await mkdirp(dest);
    await cpy(uiFiles, dest, {
      parents: true,
      cwd: cwdUi,
    });
  }

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
    targetDir,
    {
      parents: true,
      cwd: path.join(rootDir, template),
      rename(name: string) {
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

  await cpy(['static/**', 'assets/**', '.stylelintignore', '.stylelintrc'], targetDir, {
    parents: true,
    cwd: path.join(rootDir, theme),
  });

  await outputFile(path.join(targetDir, 'data/.gitkeep'), '');
  await outputFile(path.join(targetDir, 'content/.gitkeep'), '');

  /**
   * Copy migrations to the target directory
   */
  if (migrationFiles.length) {
    const dest = path.join(targetDir, 'contentful/migrations');
    await mkdirp(dest);
    await cpy(migrationFiles, dest, {
      cwd: cwdMigrations,
      parents: false,
    });
  } else {
    await outputFile(path.join(targetDir, 'contentful/migrations/.gitkeep'), '');
  }

  /**
   * Copy contentful apps to the target directory
   */
  await cpy(['**'], path.join(targetDir, 'contentful/apps'), {
    parents: true,
    cwd: cwdApps,
  });

  /**
   * Copy storybook content + data
   */
  if (contentFiles.length) {
    const dest = path.join(targetDir, 'content/storybook');
    await mkdirp(dest);
    await cpy(contentFiles, dest, {
      parents: true,
      cwd: cwdContent,
    });
  }

  if (dataFiles.length) {
    const dest = path.join(targetDir, 'data/storybook');
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
  const configFile = path.join(targetDir, 'config/_default/config.yaml');
  // Const hugoConfigBase = TOML.parse(await readFile(configFile, 'utf8'));
  // const hugoConfig = TOML.stringify({ ...hugoConfigBase, title: appName });
  const hugoConfigBase = yaml.load(await readFile(configFile, 'utf8')) as KeyValueMap;
  const hugoConfig = yaml.dump({ ...hugoConfigBase, title: appName });
  await outputFile(configFile, hugoConfig);

  /**
   * Generate hugo module config
   */
  await outputFile(
    path.join(targetDir, 'config/_default/module.yaml'),
    yaml.dump({
      imports: [
        {
          path: 'github.com/jungvonmatt/wekit/hugo-modules/core',
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
    path.join(targetDir, 'go.mod'),
    stripIndents`
    module github.com/jungvonmatt/${appName}

    go 1.17`
  );

  await outputFile(
    path.join(targetDir, 'netlify.toml'),
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
    cwd: targetDir,
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

  if (tryGitInit(targetDir)) {
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
