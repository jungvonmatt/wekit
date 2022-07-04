const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const mEditorial = migration
    .createContentType('m-editorial')
    .name('Module: Editorial')
    .description('Module wrapper for the editorial component')
    .displayField('internal_name');

  mEditorial
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mEditorial
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
    .disabled(false)
    .omitted(false);

  mEditorial
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

  mEditorial
    .createField('layout')
    .name('Layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['teaser'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'teaser',
    })
    .disabled(false)
    .omitted(false);

  mEditorial
    .createField('body')
    .name('Content')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['c-editorial'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mEditorial.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Editorial"',
  });

  mEditorial.changeFieldControl('theme', 'builtin', 'dropdown', {});

  mEditorial.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mEditorial.changeFieldControl('layout', 'builtin', 'dropdown', {});

  mEditorial.changeFieldControl('body', 'builtin', 'entryLinkEditor', {});
});
