module.exports = function (migration) {
  const cMenu = migration
    .createContentType('c-menu')
    .name('Component: Menu')
    .description('Content type for specifying menus')
    .displayField('internal_name');

  cMenu
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  cMenu
    .createField('name')
    .name('Name')
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
          linkContentType: ['c-link', 't-page', 'folder'],
        },
      ],
      linkType: 'Entry',
    });

  cMenu.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Menu > Main"',
  });

  cMenu.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: 'Used as menu identifier',
  });

  cMenu.changeFieldControl('title', 'builtin', 'singleLine', {});

  cMenu.changeFieldControl('entries', 'builtin', 'entryLinksEditor', {});

  const tPage = migration.editContentType('t-page');
  tPage
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

  tPage.moveField('submenu').afterField('parent_page');

  const dSettings = migration.editContentType('d-settings');
  dSettings
    .createField('main_menu')
    .name('Menu > Main')
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

  dSettings
    .createField('meta_menu')
    .name('Menu > Meta')
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

  dSettings
    .createField('social_menu')
    .name('Menu > Social')
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

  dSettings
    .createField('footer_menus')
    .name('Menu > Footer')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 4,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['c-menu'],
        },
      ],

      linkType: 'Entry',
    });

  dSettings.changeFieldControl('main_menu', 'builtin', 'entryLinkEditor', {});

  dSettings.changeFieldControl('meta_menu', 'builtin', 'entryLinkEditor', {});

  dSettings.changeFieldControl('social_menu', 'builtin', 'entryLinkEditor', {});

  dSettings.changeFieldControl('footer_menus', 'builtin', 'entryLinksEditor', {});
};
