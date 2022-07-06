const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const mMedia = migration
    .createContentType('m-media')
    .name('Module: Media')
    .description('Module wrapper for media component')
    .displayField('internal_name');

  mMedia
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mMedia
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

  mMedia
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

  mMedia
    .createField('layout')
    .name('Layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['default'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'default',
    })
    .disabled(false)
    .omitted(false);

  mMedia
    .createField('body')
    .name('Media')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['c-image', 'c-media', 'c-video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mMedia.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Media"',
  });

  mMedia.changeFieldControl('theme', 'builtin', 'dropdown', {});

  mMedia.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mMedia.changeFieldControl('layout', 'builtin', 'dropdown', {});

  mMedia.changeFieldControl('body', 'builtin', 'entryLinkEditor', {});
});
