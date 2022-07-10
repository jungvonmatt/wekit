const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const mText = migration
    .createContentType('m-text')
    .name('Module: Text')
    .description('Content type for placing richtext')
    .displayField('internal_name');

  mText
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mText
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
    .defaultValue({
      [defaultLocale.code]: 'light',
    })
    .disabled(true)
    .omitted(true);

  mText
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

  mText.changeFieldControl('theme', 'builtin', 'dropdown', {
    helpText: 'light: Light background, dark text; dark: Dark background, light text.',
  });

  mText.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mText
    .createField('layout')
    .name('Layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['align-left', 'align-center', 'align-right', '2-column'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'align-left',
    })
    .disabled(false)
    .omitted(false);

  mText
    .createField('headline')
    .name('Headline')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mText
    .createField('secondary_headline')
    .name('Secondary headline')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mText
    .createField('body')
    .name('Text')
    .type('RichText')
    .localized(true)
    .required(false)
    .validations([
      {
        enabledMarks: ['bold'],
        message: 'Only bold marks are allowed',
      },
      {
        enabledNodeTypes: ['entry-hyperlink', 'hyperlink', 'asset-hyperlink'],
        message: 'Only link to entry, link to Url, and link to asset nodes are allowed',
      },
      {
        nodes: {
          'entry-hyperlink': [
            {
              linkContentType: ['t-page'],
              message: null,
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  mText.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Text"',
  });

  mText.changeFieldControl('theme', 'builtin', 'dropdown', {});

  mText.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mText.changeFieldControl('layout', 'builtin', 'dropdown', {});

  mText.changeFieldControl('headline', 'builtin', 'singleLine', {});

  mText.changeFieldControl('secondary_headline', 'builtin', 'singleLine', {});

  mText.changeFieldControl('body', 'builtin', 'richTextEditor', {});
});
