module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const mList = migration
    .createContentType('m-list')
    .name('Module: List')
    .description('Allows placing multiple components in a slider or grid')
    .displayField('name');
  mList
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mList
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

  mList
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

  mList
    .createField('layout')
    .name('Module layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['grid', 'slider'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'slider',
    })
    .disabled(false)
    .omitted(false);

  mList
    .createField('body')
    .name('List items')
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
          linkContentType: ['c-editorial', 'c-image', 'c-media', 'c-video'],
        },
      ],

      linkType: 'Entry',
    });

  mList.changeFieldControl('name', 'builtin', 'singleLine', {});
  mList.changeFieldControl('header', 'builtin', 'entryLinkEditor', {});
  mList.changeFieldControl('settings', 'builtin', 'entryLinkEditor', {});
  mList.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mList.changeFieldControl('body', 'builtin', 'entryLinksEditor', {});
};
