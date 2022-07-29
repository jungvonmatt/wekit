const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const mHero = migration
    .createContentType('m-hero')
    .name('Module: Hero')
    .description('A flexible module that can combine headlines, text, media and links')
    .displayField('internal_name');

  mHero
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mHero
    .createField('theme')
    .name('Theme')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['light', 'dark'],
      },
    ])
    .disabled(true)
    .omitted(true);

  mHero
    .createField('spacing')
    .name('Spacing')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['none', 'sm', 'md', 'lg'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'md',
    })
    .disabled(false)
    .omitted(false);

  mHero
    .createField('overline')
    .name('Overline')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mHero
    .createField('headline')
    .name('Headline')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mHero
    .createField('subline')
    .name('Subline')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mHero
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

  mHero
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

  mHero
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

  mHero.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Hero"',
  });

  mHero.changeFieldControl('theme', 'builtin', 'dropdown', {});

  mHero.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mHero.changeFieldControl('overline', 'builtin', 'singleLine', {});

  mHero.changeFieldControl('headline', 'builtin', 'singleLine', {});

  mHero.changeFieldControl('subline', 'builtin', 'singleLine', {});

  mHero.changeFieldControl('text', 'builtin', 'richTextEditor', {});

  mHero.changeFieldControl('media', 'builtin', 'entryLinkEditor', {});

  mHero.changeFieldControl('links', 'builtin', 'entryLinksEditor', {});
});
