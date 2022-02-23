module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const mText = migration
    .createContentType('m-text')
    .name('Module: Text')
    .description('Content type for placing richtext')
    .displayField('name');
  mText
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  mText
    .createField('header')
    .name('Module header')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['c-module-header'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mText
    .createField('settings')
    .name('Module settings')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['d-module-settings'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mText
    .createField('layout')
    .name('Module layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['align-left', 'align-center', 'align-right'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'align-left',
    })
    .disabled(false)
    .omitted(false);

  mText
    .createField('body')
    .name('Module body')
    .type('RichText')
    .localized(true)
    .required(false)
    .validations([
      {
        enabledMarks: ['bold'],
        message: 'Only bold marks are allowed',
      },
      {
        enabledNodeTypes: ['entry-hyperlink', 'hyperlink', 'asset-hyperlink'],
        message: 'Only link to entry, link to Url, and link to asset nodes are allowed',
      },
      {
        nodes: {
          'entry-hyperlink': [
            {
              linkContentType: ['page'],
              message: null,
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  mText.changeFieldControl('name', 'builtin', 'singleLine', {});
  mText.changeFieldControl('header', 'builtin', 'entryLinkEditor', {});
  mText.changeFieldControl('settings', 'builtin', 'entryLinkEditor', {
    helpText: 'Theme, Spacings, ...',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });
  mText.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mText.changeFieldControl('body', 'builtin', 'richTextEditor', {});
};
