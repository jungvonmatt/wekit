module.exports = async function (migration) {
  const cEditorial = migration
    .createContentType('c-editorial')
    .name('Component: Editorial')
    .description('Teaser-like components with text, image & links')
    .displayField('name');
  cEditorial
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  cEditorial
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  cEditorial
    .createField('subtitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cEditorial
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
        enabledNodeTypes: ['blockquote'],
        message: 'Only quote nodes are allowed',
      },
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  cEditorial
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

  cEditorial
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
          linkContentType: ['c-link', 't-page'],
        },
      ],

      linkType: 'Entry',
    });

  cEditorial.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "This field is for internal use only. It won't appear on the page.",
  });

  cEditorial.changeFieldControl('title', 'builtin', 'singleLine', {});
  cEditorial.changeFieldControl('subtitle', 'builtin', 'singleLine', {});
  cEditorial.changeFieldControl('text', 'builtin', 'richTextEditor', {});
  cEditorial.changeFieldControl('media', 'builtin', 'entryLinkEditor', {});
  cEditorial.changeFieldControl('links', 'builtin', 'entryLinksEditor', {});
};
