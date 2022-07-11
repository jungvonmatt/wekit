module.exports = async function (migration) {
  const cEditorial = migration
    .createContentType('c-editorial')
    .name('Component: Editorial')
    .description('Teaser-like components with text, image & links')
    .displayField('internal_name');

  cEditorial
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  cEditorial
    .createField('headline')
    .name('Headline')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cEditorial
    .createField('overline')
    .name('Overline')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cEditorial
    .createField('subline')
    .name('Subline')
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

  cEditorial.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Editorial > Editorial"',
  });

  cEditorial.changeFieldControl('headline', 'builtin', 'singleLine', {});

  cEditorial.changeFieldControl('overline', 'builtin', 'singleLine', {});

  cEditorial.changeFieldControl('subline', 'builtin', 'singleLine', {});

  cEditorial.changeFieldControl('text', 'builtin', 'richTextEditor', {});

  cEditorial.changeFieldControl('media', 'builtin', 'entryLinkEditor', {});

  cEditorial.changeFieldControl('links', 'builtin', 'entryLinksEditor', {});
};
