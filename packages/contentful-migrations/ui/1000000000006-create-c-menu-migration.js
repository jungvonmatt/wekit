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

  const dSettings = migration.editContentType('d-settings');
  dSettings
    .createField('main_menu')
    .name('Main menu')
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
    .name('Meta menu')
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
    .name('Social menu')
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
    .name('Footer menus')
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
