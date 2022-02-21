import { Config } from '@jungvonmatt/contentful-ssg';

const config: Config = {
  directory: 'content',
  richTextRenderer: false,
  preview: process.env.CONTENTFUL_USE_PREVIEW === 'true',
  plugins: [
    '@jungvonmatt/cssg-plugin-hugo',
    [
      '@jungvonmatt/cssg-plugin-assets',
      {
        ratios: {
          default: { square: 1 / 1, landscape: 16 / 9, portrait: 3 / 4, rectangle: 4 / 3 },
        },
      },
    ],
  ],
};

export default config;
