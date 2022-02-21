module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const mStage = migration
    .createContentType('m-stage')
    .name('Module: Stage')
    .description('Stage module is the very first element on every page.')
    .displayField('name');
  mStage
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  mStage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  mStage
    .createField('subtitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mStage
    .createField('text')
    .name('Text')
    .type('RichText')
    .localized(true)
    .required(false)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline'],
        message: 'Only bold, italic, and underline marks are allowed',
      },
      {
        enabledNodeTypes: [
          'heading-4',
          'heading-5',
          'heading-6',
          'unordered-list',
          'ordered-list',
          'blockquote',
          'hyperlink',
          'entry-hyperlink',
          'asset-hyperlink',
        ],

        message:
          'Only heading 4, heading 5, heading 6, unordered list, ordered list, quote, link to Url, link to entry, and link to asset nodes are allowed',
      },
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  mStage
    .createField('media')
    .name('Media')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['c-image', 'c-media'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mStage
    .createField('links')
    .name('Links')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['c-link', 'page'],
        },
      ],

      linkType: 'Entry',
    });

  mStage
    .createField('layout')
    .name('Layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['fullscreen', 'split'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'fullscreen',
    })
    .disabled(false)
    .omitted(false);

  mStage
    .createField('content')
    .name('Hero content')
    .type('Array')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['c-link', 'c-editorial', 'c-image', 'c-media', 'c-video'],
        },
      ],
      linkType: 'Entry',
    });

  mStage.changeFieldControl('name', 'builtin', 'singleLine', {});
  mStage.changeFieldControl('title', 'builtin', 'singleLine', {});
  mStage.changeFieldControl('subtitle', 'builtin', 'singleLine', {});
  mStage.changeFieldControl('text', 'builtin', 'richTextEditor', {});
  mStage.changeFieldControl('media', 'builtin', 'entryLinkEditor', {});
  mStage.changeFieldControl('links', 'builtin', 'entryLinksEditor', {});
  mStage.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mStage.changeFieldControl('content', 'builtin', 'entryLinksEditor', {});
};
