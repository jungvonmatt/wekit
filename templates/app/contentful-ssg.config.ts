import { Config } from '@jungvonmatt/contentful-ssg';

const config: Config = {
  directory: 'content',
  richTextRenderer: false,
  preview: process.env.CONTENTFUL_USE_PREVIEW === 'true',
  plugins: [
    [
      '@jungvonmatt/cssg-plugin-hugo',
      // TODO: Change this in the presets of the plugin and remove it here
      {
        menuRootTypes: ['t-*', 'folder', 'x-folder'],
        typeConfig: {
          content: ['t-*'],
        },
      },
    ],
    [
      '@jungvonmatt/cssg-plugin-assets',
      {
        ratios: {
          default: { square: 1 / 1, landscape: 16 / 9, portrait: 3 / 4, rectangle: 4 / 3 },
        },
        // Uncomment line to auto-generate poster images for video files
        // generatePosterImages: true,
        // Uncomment line to download assets from contentful
        // download: true,
      },
    ],
  ],
};

export default config;
