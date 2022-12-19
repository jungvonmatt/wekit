const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const cImage = migration
    .createContentType('c-image')
    .name('Component: Image')
    .description('Image type with dedicated fields for mobile & desktop asset')
    .displayField('internal_name');

  cImage
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  cImage
    .createField('alt')
    .name('Alt text')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cImage
    .createField('caption')
    .name('Caption')
    .type('Text')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cImage
    .createField('image_mobile')
    .name('Image mobile')
    .type('Link')
    .localized(true)
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cImage
    .createField('image_desktop')
    .name('Image desktop')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cImage
    .createField('lazy')
    .name('Lazy load')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      [defaultLocale.code]: true,
    })
    .disabled(true)
    .omitted(true);

  cImage.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Stage > Image"',
  });

  cImage.changeFieldControl('alt', 'builtin', 'singleLine', {});

  cImage.changeFieldControl('caption', 'builtin', 'multipleLine', {});

  cImage.changeFieldControl('image_mobile', 'builtin', 'assetLinkEditor', {});

  cImage.changeFieldControl('image_desktop', 'builtin', 'assetLinkEditor', {
    helpText: 'Leave empty to use the mobile image on all screen sizes',
  });

  cImage.changeFieldControl('lazy', 'builtin', 'boolean', {});
});
