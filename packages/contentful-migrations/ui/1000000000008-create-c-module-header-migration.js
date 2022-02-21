module.exports = function (migration) {
  const cModuleHeader = migration
    .createContentType('c-module-header')
    .name('Component: Module header')
    .description('')
    .displayField('name');

  cModuleHeader
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  cModuleHeader
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cModuleHeader
    .createField('subtitle')
    .name('Subtitle')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cModuleHeader.changeFieldControl('name', 'builtin', 'singleLine', {});
  cModuleHeader.changeFieldControl('title', 'builtin', 'singleLine', {});
  cModuleHeader.changeFieldControl('subtitle', 'builtin', 'singleLine', {});
};
