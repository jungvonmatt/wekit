module.exports = function (migration) {
  const dSeo = migration
    .createContentType('d-seo')
    .name('Data: SEO')
    .description('SEO metadata for web pages')
    .displayField('internal_name');

  dSeo
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSeo
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSeo
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSeo
    .createField('share_image')
    .name('Share image')
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

  dSeo
    .createField('no_index')
    .name('Hide page from search engines? (noindex)')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSeo
    .createField('no_follow')
    .name('Exclude links from search rankings? (nofollow)')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dSeo.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > SEO"',
  });

  dSeo.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'This will override the page title in search engine results',
  });

  dSeo.changeFieldControl('description', 'builtin', 'singleLine', {
    helpText: 'This will be displayed in search engine results',
  });

  dSeo.changeFieldControl('share_image', 'builtin', 'assetLinkEditor', {
    helpText: 'This will be displayed when sharing the page on social media',
  });

  dSeo.changeFieldControl('no_index', 'builtin', 'boolean', {
    helpText: 'Search engines will not include this page in search results',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  dSeo.changeFieldControl('no_follow', 'builtin', 'boolean', {
    helpText: 'Search engines will not follow the links on your page',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });
};
