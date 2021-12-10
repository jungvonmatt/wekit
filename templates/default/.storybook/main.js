const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let icons = fs.readFileSync(path.join(__dirname, '../static/icons.svg'), 'utf8');

module.exports = {
  previewBody: (body) => `
    ${body}
    ${icons}
  `,
  stories: [
    '../public/**/*.stories.mdx',
    '../public/**/*.stories.@(js|jsx|ts|tsx)',
  ],
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
  features: {
    buildStoriesJson: true,
  },
  webpackFinal: (config) => {
    const { resolve } = config;
    resolve.alias = { ...(resolve.alias || {}),
      '@public': path.resolve(__dirname, '../public') ,
      '@docs': path.resolve(__dirname, '../docs/contentful')
    };
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../public/css'),
            to: 'css',
          },
          {
            from: path.resolve(__dirname, '../public/fonts'),
            to: 'fonts',
          },
        ],
      })
    );
    return { ...config, resolve };
  },
};
