module.exports = function (migration) {
  const cMenu = migration
    .createContentType('c-menu')
    .name('Component: Menu')
    .description('Content type for specifying menus')
    .displayField('name');
  cMenu
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  cMenu
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cMenu
    .createField('entries')
    .name('Entries')
    .type('Array')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['c-link', 'page', 'folder'],
        },
      ],
      linkType: 'Entry',
    });

  cMenu.changeFieldControl('name', 'builtin', 'singleLine', {});
  cMenu.changeFieldControl('title', 'builtin', 'singleLine', {});
  cMenu.changeFieldControl('entries', 'builtin', 'entryLinksEditor', {});

  const page = migration.editContentType('page');
  page
    .createField('submenu')
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

  page.moveField('submenu').beforeField('content');
  page.changeFieldControl('submenu', 'builtin', 'entryLinkEditor', {});
};
