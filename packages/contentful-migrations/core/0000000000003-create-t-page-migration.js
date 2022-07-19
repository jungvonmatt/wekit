/* eslint-env node */
const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context) => {
  const tPage = migration
    .createContentType('t-page')
    .name('Template: Page')
    .description('Template for a regular web page')
    .displayField('internal_name');

  tPage
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  tPage
    .createField('title')
    .name('Page title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  tPage
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  tPage
    .createField('parent_page')
    .name('Parent page')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['folder', 't-page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  tPage
    .createField('seo')
    .name('SEO metadata')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['d-seo'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  tPage
    .createField('theme')
    .name('Theme')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['light', 'dark'],
      },
    ])
    .disabled(true)
    .omitted(true);

  tPage
    .createField('stage')
    .name('Stage')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['m-stage'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  tPage
    .createField('content')
    .name('Content')
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
          linkContentType: ['m-text', 'm-hero', 'm-list', 'm-columns'],
        },
      ],
      linkType: 'Entry',
    });

  tPage.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page"',
  });

  tPage.changeFieldControl('title', 'builtin', 'singleLine', {});

  tPage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    trackingFieldId: 'title',
  });

  tPage.changeFieldControl('parent_page', 'builtin', 'entryLinkEditor', {});

  tPage.changeFieldControl('seo', 'builtin', 'entryCardEditor', {});

  tPage.changeFieldControl('theme', 'builtin', 'radio', {});

  tPage.changeFieldControl('stage', 'builtin', 'entryLinkEditor', {});

  tPage.changeFieldControl('content', 'builtin', 'entryLinksEditor', {});

  // Define page type and components (Compose only)
  tPage.setAnnotations(['Contentful:AggregateRoot']);
  tPage.editField('stage').setAnnotations(['Contentful:AggregateComponent']);
  tPage.editField('content').setAnnotations(['Contentful:AggregateComponent']);

  // Create editor layout (Compose only)
  const editorLayout = tPage.createEditorLayout();

  editorLayout.createFieldGroup('content', {
    name: 'Content',
  });

  editorLayout.changeFieldGroupControl('content', 'builtin', 'topLevelTab', {
    helpText: 'Main content',
  });

  editorLayout.createFieldGroup('settings').name('Settings');

  editorLayout.changeFieldGroupControl('settings', 'builtin', 'topLevelTab', {
    helpText: 'Page settings',
  });

  editorLayout.moveField('title').toTheTopOfFieldGroup('settings');

  editorLayout.moveField('slug').afterField('title');

  editorLayout.moveField('parent_page').afterField('slug');

  editorLayout.moveField('seo').afterField('parent_page');
});
