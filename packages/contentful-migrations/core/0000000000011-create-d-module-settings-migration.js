module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const dModuleSettings = migration
    .createContentType('d-module-settings')
    .name('Data: Module Settings')
    .description('Layout settings (theme, spacing, ...) for modules')
    .displayField('name');
  dModuleSettings
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  dModuleSettings
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

  dModuleSettings
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

  dModuleSettings.changeFieldControl('name', 'builtin', 'singleLine', {});
  dModuleSettings.changeFieldControl('theme', 'builtin', 'dropdown', {
    helpText: 'light: Light background, dark text; dark: Dark background, light text.',
  });
  dModuleSettings.changeFieldControl('spacing', 'builtin', 'dropdown', {});
};
