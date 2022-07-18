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
    .createField('seo_title')
    .name('SEO title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  tPage
    .createField('seo_description')
    .name('SEO description')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  tPage
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

  tPage
    .createField('no_index')
    .name('Hide page from search engines? (noindex)')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  tPage
    .createField('no_follow')
    .name('Exclude links from search rankings? (nofollow)')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

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
          linkContentType: ['m-columns', 'm-editorial', 'm-list', 'm-text'],
        },
      ],
      linkType: 'Entry',
    });

  tPage.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page"',
  });

  tPage.changeFieldControl('title', 'builtin', 'singleLine', {});

  tPage.changeFieldControl('parent_page', 'builtin', 'entryLinkEditor', {});

  tPage.changeFieldControl('slug', 'builtin', 'slugEditor', {
    trackingFieldId: 'title',
  });

  tPage.changeFieldControl('seo_title', 'builtin', 'singleLine', {
    helpText: 'This will override the page title in search engine results',
  });

  tPage.changeFieldControl('seo_description', 'builtin', 'singleLine', {
    helpText: 'This will be displayed in search engine results',
  });

  tPage.changeFieldControl('share_image', 'builtin', 'assetLinkEditor', {
    helpText: 'This will be displayed when sharing the page on social media',
  });

  tPage.changeFieldControl('no_index', 'builtin', 'boolean', {
    helpText: 'Search engines will not include this page in search results',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

  tPage.changeFieldControl('no_follow', 'builtin', 'boolean', {
    helpText: 'Search engines will not follow the links on your page',
    trueLabel: 'Yes',
    falseLabel: 'No',
  });

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

  editorLayout.editFieldGroup('settings').createFieldGroup('seo').name('SEO');

  editorLayout.changeFieldGroupControl('seo', 'builtin', 'fieldset', {
    helpText: 'Search related fields',
    collapsedByDefault: false,
  });

  editorLayout.moveField('title').toTheTopOfFieldGroup('settings');

  editorLayout.moveField('slug').afterField('title');

  editorLayout.moveField('parent_page').afterField('slug');

  editorLayout.moveField('seo_title').toTheTopOfFieldGroup('seo');

  editorLayout.moveField('seo_description').afterField('seo_title');

  editorLayout.moveField('share_image').afterField('seo_description');

  editorLayout.moveField('no_index').afterField('share_image');

  editorLayout.moveField('no_follow').afterField('no_index');
});
