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
    .displayField('internal_name');

  mList
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mList
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

  mList
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

  mList
    .createField('layout')
    .name('Layout')
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

  mList.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > List"',
  });

  mList.changeFieldControl('layout', 'builtin', 'dropdown', {});

  mList.changeFieldControl('theme', 'builtin', 'dropdown', {});

  mList.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mList.changeFieldControl('body', 'builtin', 'entryLinksEditor', {});
};
