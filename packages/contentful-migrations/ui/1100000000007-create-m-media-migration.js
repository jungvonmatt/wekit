module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const mMedia = migration
    .createContentType('m-media')
    .name('Module: Media')
    .description('Module wrapper for media component')
    .displayField('name');
  mMedia
    .createField('name')
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
    .disabled(false)
    .omitted(false);

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

  mMedia.changeFieldControl('name', 'builtin', 'singleLine', {});
  mMedia.changeFieldControl('theme', 'builtin', 'dropdown', {});
  mMedia.changeFieldControl('spacing', 'builtin', 'dropdown', {});
  mMedia.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mMedia.changeFieldControl('body', 'builtin', 'entryLinkEditor', {});
};
