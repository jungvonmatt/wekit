import { Config } from '@jungvonmatt/contentful-ssg';

const config: Config = {
  directory: 'content',
  richTextRenderer: false,
  preview: process.env.CONTENTFUL_USE_PREVIEW === 'true',
  plugins: ['@jungvonmatt/cssg-plugin-hugo', '@jungvonmatt/cssg-plugin-assets'],
};

export default config;
