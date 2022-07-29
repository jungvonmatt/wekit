module.exports = function (migration) {
  const cLink = migration
    .createContentType('c-link')
    .name('Component: Link')
    .description('Content type for internal & external Links')
    .displayField('internal_name');

  cLink
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  cLink
    .createField('text')
    .name('Text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cLink
    .createField('icon')
    .name('Icon')
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

  cLink
    .createField('link_to_entry')
    .name('Link to entry')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['t-page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  cLink
    .createField('link_to_asset')
    .name('Link to asset')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image', 'audio', 'video', 'presentation', 'spreadsheet', 'pdfdocument', 'archive'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cLink
    .createField('link_to_url')
    .name('Link to URL')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^(http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
          flags: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  cLink
    .createField('query')
    .name('Query')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cLink
    .createField('target_blank')
    .name('Open in new tab')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cLink
    .createField('open_as_download')
    .name('Open as download')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cLink
    .createField('appearance')
    .name('Appearance')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['link', 'button'],
      },
    ])
    .disabled(false)
    .omitted(false);

  cLink.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Stage > Link"',
  });

  cLink.changeFieldControl('text', 'builtin', 'singleLine', {});

  cLink.changeFieldControl('query', 'builtin', 'singleLine', {});

  cLink.changeFieldControl('icon', 'builtin', 'assetLinkEditor', {
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cLink.changeFieldControl('link_to_entry', 'builtin', 'entryLinkEditor', {
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cLink.changeFieldControl('link_to_asset', 'builtin', 'assetLinkEditor', {
    helpText: 'Used when no internal link is specified',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cLink.changeFieldControl('link_to_url', 'builtin', 'urlEditor', {});

  cLink.changeFieldControl('target_blank', 'builtin', 'boolean', {});

  cLink.changeFieldControl('open_as_download', 'builtin', 'boolean', {});

  cLink.changeFieldControl('appearance', 'builtin', 'dropdown', {});
};
