module.exports = function (migration) {
  const dSettings = migration
    .createContentType('d-settings')
    .name('Data: Settings')
    .description('Global site parameters')
    .displayField('internal_name');

  dSettings
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSettings
    .createField('title')
    .name('Page title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSettings
    .createField('home')
    .name('Home page')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['t-page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  dSettings.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Global settings"',
  });

  dSettings.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'The title in the browser tab',
  });

  dSettings.changeFieldControl('home', 'builtin', 'entryLinkEditor', {});
};
