module.exports = function (migration) {
  const seo = migration
    .createContentType('seo')
    .name('Compose: SEO')
    .description('SEO Metadata for web pages in Compose. DO NOT DELETE')
    .displayField('name');
  seo
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  seo
    .createField('title')
    .name('SEO title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  seo
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  seo
    .createField('image')
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
  seo
    .createField('keywords')
    .name('Keywords')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(true)
    .omitted(false);
  seo
    .createField('no_index')
    .name('Hide page from search engines? (noindex)')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  seo
    .createField('no_follow')
    .name('Exclude links from search rankings? (nofollow)')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  seo.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "⚠️ Don't edit this field! The Compose will fill it for you.",
  });

  seo.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'This will override the page title in search engine results',
  });

  seo.changeFieldControl('description', 'builtin', 'singleLine', {
    helpText: 'This will be displayed in search engine results',
  });

  seo.changeFieldControl('image', 'builtin', 'assetLinkEditor', {
    helpText: 'This will be displayed when sharing the page on social media',
  });

  seo.changeFieldControl('keywords', 'builtin', 'singleLine', {});

  seo.changeFieldControl('no_index', 'builtin', 'boolean', {
    helpText: 'Search engines will not include this page in search results',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  seo.changeFieldControl('no_follow', 'builtin', 'boolean', {
    helpText: 'Search engines will not follow the links on your page',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });
};
