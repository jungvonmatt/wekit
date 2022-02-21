module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const mEditorial = migration
    .createContentType('m-editorial')
    .name('Module: Editorial')
    .description('Module wrapper for the editorial content')
    .displayField('name');

  mEditorial
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mEditorial
    .createField('header')
    .name('Module header')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['c-module-header'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mEditorial
    .createField('settings')
    .name('Module settings')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['d-module-settings'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mEditorial
    .createField('layout')
    .name('Module layout')
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

  mEditorial
    .createField('body')
    .name('Module body')
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

  mEditorial.changeFieldControl('name', 'builtin', 'singleLine', {});
  mEditorial.changeFieldControl('header', 'builtin', 'entryLinkEditor', {});

  mEditorial.changeFieldControl('settings', 'builtin', 'entryLinkEditor', {
    helpText: 'Theme, Spacings, ...',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  mEditorial.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mEditorial.changeFieldControl('body', 'builtin', 'entryLinkEditor', {});
};
