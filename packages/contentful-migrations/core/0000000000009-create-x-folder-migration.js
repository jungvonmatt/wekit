module.exports = function (migration) {
  const xFolder = migration.createContentType('x-folder').name('Folder').description('').displayField('name');

  xFolder
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  xFolder
    .createField('label')
    .name('Label')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  xFolder
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  xFolder
    .createField('parent')
    .name('Parent page')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['x-folder', 'page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  xFolder
    .createField('menu')
    .name('Submenu')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['c-menu'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  xFolder.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "This field is for internal use. It won't appear on the page.",
  });
  xFolder.changeFieldControl('label', 'builtin', 'singleLine', {});
  xFolder.changeFieldControl('slug', 'builtin', 'slugEditor', {
    trackingFieldId: 'label',
  });
  xFolder.changeFieldControl('parent', 'builtin', 'entryLinkEditor', {});
  xFolder.changeFieldControl('menu', 'builtin', 'entryLinkEditor', {});
};
