module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const cImage = migration.createContentType('c-image').name('Component: Image').description('').displayField('name');
  cImage
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(false)
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
    .disabled(false)
    .defaultValue({
      [defaultLocale.code]: true,
    })
    .omitted(false);

  cImage.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "This field is for internal use only. It won't appear on the page.",
  });
  cImage.changeFieldControl('alt', 'builtin', 'singleLine', {});
  cImage.changeFieldControl('caption', 'builtin', 'multipleLine', {});
  cImage.changeFieldControl('image_mobile', 'builtin', 'assetLinkEditor', {});
  cImage.changeFieldControl('image_desktop', 'builtin', 'assetLinkEditor', {
    helpText: 'Leave emptzy to use the mobile image on all screen sizes',
  });
  cImage.changeFieldControl('lazy', 'builtin', 'boolean', {});
};
