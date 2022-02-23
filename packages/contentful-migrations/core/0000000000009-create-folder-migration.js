module.exports = function (migration) {
  const folder = migration
    .createContentType('folder')
    .name('Folder')
    .description('Allows structuring pages in folders')
    .displayField('name');

  folder
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  folder
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

  folder
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

  folder
    .createField('parent')
    .name('Parent page')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['folder', 'page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  folder
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

  folder.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "This field is for internal use. It won't appear on the page.",
  });
  folder.changeFieldControl('label', 'builtin', 'singleLine', {});
  folder.changeFieldControl('slug', 'builtin', 'slugEditor', {
    trackingFieldId: 'label',
  });
  folder.changeFieldControl('parent', 'builtin', 'entryLinkEditor', {});
  folder.changeFieldControl('menu', 'builtin', 'entryLinkEditor', {});
};
