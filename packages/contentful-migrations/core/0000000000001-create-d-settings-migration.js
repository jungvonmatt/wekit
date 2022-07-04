module.exports = function (migration) {
  const dSettings = migration
    .createContentType('d-settings')
    .name('Data: Settings')
    .description('')
    .displayField('name');
  dSettings
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
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
    .createField('logo')
    .name('Logo')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

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

  dSettings.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "This field is for internal use only. It won't appear on the page.",
  });

  dSettings.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'The title in the browser tab',
  });

  dSettings.changeFieldControl('home', 'builtin', 'entryLinkEditor', {});
};
