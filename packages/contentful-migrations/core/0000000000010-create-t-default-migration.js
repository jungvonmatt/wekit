module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const tDefault = migration
    .createContentType('t-default')
    .name('Template: Default')
    .description('')
    .displayField('name');

  tDefault
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  tDefault
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

  tDefault
    .createField('stage')
    .name('Stage')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['m-stage'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  tDefault
    .createField('modules')
    .name('Content modules')
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
          linkContentType: ['m-columns', 'm-editorial', 'm-list', 'm-section', 'm-text'],
        },
      ],
      linkType: 'Entry',
    });

  tDefault.changeFieldControl('name', 'builtin', 'singleLine', {});
  tDefault.changeFieldControl('theme', 'builtin', 'radio', {});
  tDefault.changeFieldControl('stage', 'builtin', 'entryLinkEditor', {});
  tDefault.changeFieldControl('modules', 'builtin', 'entryLinksEditor', {});
};
