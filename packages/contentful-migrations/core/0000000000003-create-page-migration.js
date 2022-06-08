module.exports = function (migration) {
  const page = migration
    .createContentType('page')
    .name('Compose: Page')
    .description('Represents a web page in Compose. DO NOT DELETE')
    .displayField('name');
  page
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  page
    .createField('title')
    .name('Page title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('parent_page')
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

  page
    .createField('seo')
    .name('SEO metadata')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['seo'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  page
    .createField('content')
    .name('Content')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['t-default'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  page.changeFieldControl('name', 'builtin', 'singleLine', {});
  page.changeFieldControl('title', 'builtin', 'singleLine', {});
  page.changeFieldControl('parent_page', 'builtin', 'entryLinkEditor', {});
  page.changeFieldControl('slug', 'builtin', 'slugEditor', {
    trackingFieldId: 'title',
  });
  page.changeFieldControl('seo', 'builtin', 'entryCardEditor', {});
  page.changeFieldControl('content', 'builtin', 'entryCardEditor', {});
};
