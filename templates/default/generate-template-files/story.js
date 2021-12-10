const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Story Bundle',
    defaultCase: '(kebabCase)',
    entry: {
      folderPath: './themes/storybook/generate-template-files/templates/story-bundle/',
    },
    stringReplacers: [
      {
        question: 'Content type (e.g. "c-button")',
        slot: '__contentType__',
      },
      {
        question: 'Variation (e.g. "solid")',
        slot: '__variation__',
      },
    ],
    output: {
      path: './',
      overwrite: true,
    },
  },
  {
    option: 'Story Single',
    defaultCase: '(kebabCase)',
    entry: {
      folderPath: './themes/storybook/generate-template-files/templates/story-single/',
    },
    stringReplacers: [
      {
        question: 'Content type (e.g. "c-button")',
        slot: '__contentType__',
      },
      {
        question: 'Variation (e.g. "solid")',
        slot: '__variation__',
      },
    ],
    output: {
      path: './',
      overwrite: true,
    },
  },
  {
    option: 'Docs',
    defaultCase: '(noCase)',
    entry: {
      folderPath: './themes/storybook/generate-template-files/templates/docs/',
    },
    stringReplacers: [
      {
        question: 'Title (e.g. "introduction")',
        slot: '__title__',
      },
    ],
    output: {
      path: './',
      overwrite: true,
    },
  },
]);
