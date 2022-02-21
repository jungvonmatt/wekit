module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const mColumns = migration
    .createContentType('m-columns')
    .name('Module: Columns')
    .description('Helper for two column layouts')
    .displayField('name');

  mColumns
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mColumns
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

  mColumns
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

  mColumns
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

  mColumns
    .createField('column_left')
    .name('Column left')
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
          linkContentType: ['c-link', 'c-editorial', 'c-image', 'c-media', 'c-video'],
        },
      ],
      linkType: 'Entry',
    });

  mColumns
    .createField('column_right')
    .name('Column right')
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
          linkContentType: ['c-link', 'c-editorial', 'c-image', 'c-media', 'c-video'],
        },
      ],
      linkType: 'Entry',
    });

  mColumns.changeFieldControl('name', 'builtin', 'singleLine', {});
  mColumns.changeFieldControl('header', 'builtin', 'entryLinkEditor', {});
  mColumns.changeFieldControl('settings', 'builtin', 'entryLinkEditor', {
    helpText: 'Theme, Spacings, ...',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });
  mColumns.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mColumns.changeFieldControl('column_left', 'builtin', 'entryLinksEditor', {});
  mColumns.changeFieldControl('column_right', 'builtin', 'entryLinksEditor', {});
};
