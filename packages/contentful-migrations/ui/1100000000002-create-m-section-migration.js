module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const mSection = migration
    .createContentType('m-section')
    .name('Module: Section')
    .description('')
    .displayField('name');

  mSection
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mSection
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

  mSection
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

  mSection
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

  mSection
    .createField('body')
    .name('Module body')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [],
      linkType: 'Entry',
    });

  mSection.changeFieldControl('name', 'builtin', 'singleLine', {});
  mSection.changeFieldControl('header', 'builtin', 'entryLinkEditor', {});

  mSection.changeFieldControl('settings', 'builtin', 'entryLinkEditor', {
    helpText: 'Theme, Spacings, ...',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  mSection.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mSection.changeFieldControl('body', 'builtin', 'entryLinksEditor', {});
};
