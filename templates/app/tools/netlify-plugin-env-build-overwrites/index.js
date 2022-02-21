/* eslint-env node */

// This is the main file for the Netlify Build plugin wekit-storybook.
// Please read the comments to learn more about the Netlify Build plugin syntax.
// Find more information in the Netlify documentation.

// The plugin main logic uses `on...` event handlers that are triggered on
// each new Netlify Build.
// Anything can be done inside those event handlers.
// Information about the current build are passed as arguments. The build
// configuration file and some core utilities are also available.
const fs = require('fs/promises');

const isObject = (val) => Object.prototype.toString.call(val) === '[object Object]';

let publishDir;

module.exports = {
  async onPreBuild({ netlifyConfig, inputs, constants }) {
    const { variable, overwrites } = inputs;
    publishDir = constants.PUBLISH_DIR;
    const { [variable]: check = false } = process.env;
    if (!check) {
      return;
    }

    Object.entries(overwrites).forEach(([key, value]) => {
      const { [key]: current } = netlifyConfig.build;
      if (isObject(current) && isObject(value)) {
        netlifyConfig.build[key] = { ...current, ...value };
      } else {
        netlifyConfig.build[key] = value;
      }
    });
  },

  async onBuild({ constants }) {
    if (constants.PUBLISH_DIR !== publishDir) {
      await fs.rename(publishDir, `${publishDir}.old`);
      await fs.rename(constants.PUBLISH_DIR, publishDir);
    }
  },
};
