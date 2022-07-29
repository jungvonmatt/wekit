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
    .name('SEO > Page title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSettings
    .createField('site_name')
    .name('SEO > Site name')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSettings
    .createField('default_share_image')
    .name('SEO > Default share image')
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

  dSettings.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Global settings"',
  });

  dSettings.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'The title in the browser tab',
  });

  dSettings.changeFieldControl('site_name', 'builtin', 'singleLine', {
    helpText: 'Used for the Open Graph meta tag og:site_name',
  });

  dSettings.changeFieldControl('default_share_image', 'builtin', 'assetLinkEditor', {
    helpText: 'This will be displayed when you share a page on social media, unless you have explicitly set your own in the page',
  });

  dSettings.changeFieldControl('home', 'builtin', 'entryLinkEditor', {});
};
