module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

  const cMedia = migration
    .createContentType('c-media')
    .name('Component: Media')
    .description('Images / loop videos with predefined ratios')
    .displayField('name');
  cMedia
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  cMedia
    .createField('alt')
    .name('Alt text')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  cMedia
    .createField('caption')
    .name('Caption')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cMedia
    .createField('media')
    .name('Media')
    .type('Link')
    .localized(true)
    .required(true)
    .validations([
      {
        linkMimetypeGroup: ['image', 'video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cMedia
    .createField('mobile_ratio')
    .name('Mobile ratio')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['hd', 'rectangle', 'square', 'portrait'],
      },
    ])
    .disabled(false)
    .omitted(false);

  cMedia
    .createField('desktop_ratio')
    .name('Desktop ratio')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['hd', 'rectangle', 'square', 'portrait'],
      },
    ])
    .disabled(false)
    .omitted(false);

  cMedia
    .createField('focus_area')
    .name('Focus area')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: [
          'center',
          'top',
          'bottom',
          'right',
          'left',
          'top_right',
          'top_left',
          'bottom_right',
          'bottom_left',
          'face',
          'faces',
        ],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'center',
    })
    .disabled(false)
    .omitted(false);

  cMedia
    .createField('media_hd')
    .name('Media hd')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image', 'video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cMedia
    .createField('media_rectangle')
    .name('Media rectangle')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image', 'video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cMedia
    .createField('media_square')
    .name('Media square')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image', 'video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cMedia
    .createField('media_portrait')
    .name('Media portrait')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image', 'video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cMedia
    .createField('lazy')
    .name('Lazy load')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      [defaultLocale.code]: true,
    })
    .disabled(false)
    .omitted(false);

  cMedia.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "This field is for internal use only. It won't appear on the page.",
  });
  cMedia.changeFieldControl('alt', 'builtin', 'singleLine', {});
  cMedia.changeFieldControl('caption', 'builtin', 'multipleLine', {});
  cMedia.changeFieldControl('media', 'builtin', 'assetLinkEditor', {});

  cMedia.changeFieldControl('mobile_ratio', 'builtin', 'dropdown', {
    helpText: 'Select the ratio for mobile. Leave empty to use original image dimensions',
  });

  cMedia.changeFieldControl('desktop_ratio', 'builtin', 'dropdown', {
    helpText: 'Select the ratio for desktop. Leave empty to use original image dimensions',
  });

  cMedia.changeFieldControl('focus_area', 'builtin', 'dropdown', {
    helpText: 'You can choose the focus area for resizing. The default is center',
  });

  cMedia.changeFieldControl('media_hd', 'builtin', 'assetLinkEditor', {
    helpText: 'Ratio: 16:9',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cMedia.changeFieldControl('media_rectangle', 'builtin', 'assetLinkEditor', {
    helpText: 'Ratio: 4:3',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cMedia.changeFieldControl('media_square', 'builtin', 'assetLinkEditor', {
    helpText: 'Ratio: 1:1',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cMedia.changeFieldControl('media_portrait', 'builtin', 'assetLinkEditor', {
    helpText: 'Ratio: 2:3',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cMedia.changeFieldControl('lazy', 'builtin', 'boolean', {});
};
