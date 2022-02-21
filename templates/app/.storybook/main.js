const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let icons = fs.readFileSync(path.join(__dirname, '../static/icons.svg'), 'utf8');

module.exports = {
  previewBody: (body) => `
    ${body}
    ${icons}
  `,
  stories: ['../public/**/*.stories.mdx', '../public/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {
    builder: 'webpack5',
  },
  // logLevel: 'debug',
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: { transcludeMarkdown: true },
    },
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/html',
  features: {
    buildStoriesJson: true,
  },
  webpackFinal: (config) => {
    const { resolve } = config;
    resolve.alias = {
      ...(resolve.alias || {}),
      '@public': path.resolve(__dirname, '../public'),
      '@docs': path.resolve(__dirname, '../docs/contentful'),
    };
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: ['css', 'js', 'fonts']
          .map((dir) => ({
            from: path.resolve(__dirname, `../public/${dir}`),
            to: dir,
          }))
          .filter((pattern) => fs.existsSync(pattern.from)),
      })
    );
    return { ...config, resolve };
  },
};
