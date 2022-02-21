const parserHtml = require('prettier/parser-html');
const prettier = require('prettier/standalone');

import '@public/css/main.css';

const customViewports = {
  mobile: {
    name: 'Mobile (320)',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  tablet: {
    name: 'Tablet (768)',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  tabletLandscape: {
    name: 'Tablet Landscape (1024)',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  desktop: {
    name: 'Desktop (1280)',
    styles: {
      width: '1280px',
      height: '768px',
    },
  },
  desktopMax: {
    name: 'Desktop Max (1920)',
    styles: {
      width: '1920px',
      height: '768px',
    },
  },
};

export const parameters = {
  backgrounds: { disable: true },
  layout: 'fullscreen',
  viewport: { viewports: customViewports },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Introduction', 'Components', 'Modules', 'Templates'],
    },
  },
  // controls: { disable: false },
  actions: { disable: true },
  docs: {
    transformSource: (src) =>
      prettier.format(src, {
        parser: 'html',
        plugins: [parserHtml],
        htmlWhitespaceSensitivity: 'ignore',
      }),
  },
};
