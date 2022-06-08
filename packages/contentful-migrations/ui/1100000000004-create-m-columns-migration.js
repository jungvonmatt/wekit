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

  mColumns
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

  mColumns.changeFieldControl('theme', 'builtin', 'dropdown', {
    helpText: 'light: Light background, dark text; dark: Dark background, light text.',
  });
  mColumns.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mColumns
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
  mColumns.changeFieldControl('theme', 'builtin', 'dropdown', {});
  mColumns.changeFieldControl('spacing', 'builtin', 'dropdown', {});
  mColumns.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mColumns.changeFieldControl('column_left', 'builtin', 'entryLinksEditor', {});
  mColumns.changeFieldControl('column_right', 'builtin', 'entryLinksEditor', {});
};
