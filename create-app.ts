/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */
import retry from 'async-retry';
import chalk from 'chalk';
import { stripIndents } from 'common-tags';
import TOML from '@iarna/toml';
import micromatch from 'micromatch';
import cpy from 'cpy';
import fs from 'fs';
import os from 'os';
import path from 'path';
import globby from 'globby';
import { makeDir } from './helpers/make-dir';
import { tryGitInit } from './helpers/git';
import { install } from './helpers/install';
import { isFolderEmpty } from './helpers/is-folder-empty';
import { isWriteable } from './helpers/is-writeable';
import { ask } from './helpers/prompts';
import { loadTemplate } from './helpers/template';
import mkdirp from 'mkdirp';
import { outputFile, readFile } from 'fs-extra';

export class DownloadError extends Error {}

export async function createApp({
  appPath,
  cache,
}: {
  appPath: string;
  cache: boolean;
}): Promise<void> {
  const template = 'site';
  let templateDir = '';
  try {
    templateDir = await loadTemplate(cache);
  } catch (error) {
    console.log('Sorry, you need read permissions to private jvm repositories');
    process.exit(1);
  }

  const migrationsAvailable = await globby('**/*.js', {
    cwd: path.join(templateDir, 'migrations'),
  });

  const contentAvailable = await globby('**/*.md', {
    cwd: path.join(templateDir, 'ui/content/stories'),
  });
  const dataAvailable = await globby('**/*', {
    cwd: path.join(templateDir, 'ui/data'),
  });

  const uiAvailable = await globby(['{components,modules,templates}/*'], {
    cwd: path.join(templateDir, 'ui/layouts/partials'),
  });
  const ui = uiAvailable.reduce<{ [x: string]: string[] }>((result, file) => {
    const type = path.dirname(file);
    const name = path.basename(file, '.html');

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
  const args = await ask(ui);
  console.log(args);

  const patterns = Object.entries(args?.ui ?? {}).flatMap(([type, entries]) =>
    entries.flatMap((entry) => [`**/${type}/${entry}.html`,`**/${entry}/**`,`**/*${entry}*.js`])
  );

  const uiFiles = micromatch(uiAvailable, patterns);
  const migrationFiles = micromatch(migrationsAvailable, ['core/*', ...patterns]);
  const contentFiles = micromatch(contentAvailable, patterns);
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
      'create-story': 'node ./generate-template-files/story.js',
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
    '@jungvonmatt/contentful-migrations',
    '@jungvonmatt/contentful-ssg',
    '@jungvonmatt/cssg-plugin-assets',
    '@jungvonmatt/cssg-plugin-hugo',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/builder-webpack5',
    '@storybook/html',
    '@storybook/manager-webpack5',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'babel-loader',
    'contentful-cli',
    'copy-webpack-plugin',
    'del-cli',
    'eslint',
    'eslint-config-prettier',
    'eslint-config-xo',
    'eslint-config-xo-space',
    'eslint-config-xo-typescript',
    'eslint-plugin-prettier',
    'html-webpack-plugin',
    'husky',
    'markdown-table',
    'npm-run-all',
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
   * Copy the template files to the target directory.
   */
  await cpy(['**', '!contentful', '!data', '!content', '!layout/partials', '!.env', '!package.json', '!package-lock.json'], root, {
    parents: true,
    cwd: path.join(templateDir, template),
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'eslintrc.json': {
          return '.'.concat(name);
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case 'README-template.md': {
          return 'README.md';
        }
        default: {
          return name;
        }
      }
    },
  });

  /**
   * Copy partials to the target directory
   */
  if (uiFiles.length) {
    const dest = path.join(root, 'layouts/partials');
    await mkdirp(dest);
    await cpy(uiFiles, dest, {
      parents: true,
      cwd: path.join(templateDir, 'ui/layouts/partials'),
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
      parents: false,
    });
  } else {
    await outputFile(path.join(root, 'contentful/migrations/.gitkeep'), '');
  }

  /**
   * Copy storybook content + data
   */
  if (contentFiles.length) {
    const dest = path.join(root, 'content/storybook/stories');
    await mkdirp(dest);
    await cpy(contentFiles, dest, {
      parents: true,
      cwd: path.join(templateDir, 'ui/content/stories'),
    });
  }
  if (dataFiles.length) {
    const dest = path.join(root, 'data/storybook');
    await mkdirp(dest);
    await cpy(dataFiles, dest, {
      parents: true,
      cwd: path.join(templateDir, 'ui/data'),
    });
  }

  /**
   * Generate hugo config files
   */
  const configFile = path.join(root, 'config/_default/config.toml');
  const hugoConfigBase = TOML.parse(await readFile(configFile, 'utf8'));
  const hugoConfig = TOML.stringify({ ...hugoConfigBase, title: appName });
  await outputFile(configFile, hugoConfig);

  /**
   * Generate hugo module config
   */
  await outputFile(
    path.join(root, 'config/_default/module.toml'),
    TOML.stringify({
      imports: {
        path: 'github.com/jungvonmatt/contentful-hugo-core',
        mounts: {
          source: 'layouts',
          target: 'layouts',
        },
      },
    })
  );

  await outputFile(
    path.join(root, 'go.mod'),
    stripIndents`
    module github.com/jungvonmatt/${appName}

    go 1.17`
  );

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
