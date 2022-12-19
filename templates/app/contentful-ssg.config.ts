import { Config } from '@jungvonmatt/contentful-ssg';

const config: Config = {
  directory: 'content',
  richTextRenderer: false,
  preview: process.env.CONTENTFUL_USE_PREVIEW === 'true',
  plugins: [
    [
      '@jungvonmatt/cssg-plugin-hugo',
      {
        menuRootTypes: ['page', 't-page'],
        typeConfig: {
          content: ['page', 't-*'],
        },
      },
    ],
    [
      '@jungvonmatt/cssg-plugin-assets',
      {
        ratios: {
          default: {
            '1x1': 1,
            '16x9': 16 / 9,
            '9x16': 9 / 16,
            '3x4': 3 / 4,
            '4x3': 4 / 3,
          },
        },
        focusAreas: {
          contentTypes: {
            'c-responsive-media': {
              default: 'center',
              fields: {
                mobile_media: 'field:mobile_focus_area',
                desktop_media: 'field:desktop_focus_area',
              },
            }
          },
        },
        // Uncomment line to auto-generate poster images for video files
        // generatePosterImages: true,
        // Uncomment line to download assets from Contentful
        // download: true,
      },
    ],
  ],
};

export default config;


// config: {
//   default: 'field:a',
//   contentTypes: { ct: { default: 'field:b', fields: { media: 'field:c' } } },
// },
// fields: { a: 'bottom', b: 'right', c: 'top_right' },
