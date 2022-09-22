const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const cMedia = migration
    .createContentType('c-responsive-media')
    .name('Component: Responsive media')
    .description('Image or short loop video for different screen sizes')
    .displayField('internal_name');

  cMedia
    .createField('internal_name')
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
    .localized(true)
    .required(true)
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
    .createField('mobile_media')
    .name('Mobile > Media')
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
    .name('Mobile > Ratio')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['1x1', '16x9', '9x16', '4x3', '3x4'],
      },
    ])
    .disabled(false)
    .omitted(false);

  cMedia
    .createField('mobile_focus_area')
    .name('Mobile > Focus area')
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
    .createField('desktop_media')
    .name('Desktop > Media')
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
    .createField('desktop_ratio')
    .name('Desktop > Ratio')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['1x1', '16x9', '9x16', '4x3', '3x4'],
      },
    ])
    .disabled(false)
    .omitted(false);

  cMedia
    .createField('desktop_focus_area')
    .name('Desktop > Focus area')
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

  cMedia.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Media > Responsive media"',
  });

  cMedia.changeFieldControl('alt', 'builtin', 'singleLine', {});

  cMedia.changeFieldControl('caption', 'builtin', 'multipleLine', {});

  cMedia.changeFieldControl('mobile_media', 'builtin', 'assetLinkEditor', {});

  cMedia.changeFieldControl('mobile_focus_area', 'builtin', 'dropdown', {
    helpText: 'Choose a focus area that will be used for resizing. Default is "center".',
  });

  cMedia.changeFieldControl('mobile_ratio', 'builtin', 'dropdown', {
    helpText: 'Select a ratio for mobile or leave empty to use original image dimensions.',
  });

  cMedia.changeFieldControl('desktop_media', 'builtin', 'assetLinkEditor', {
    helpText:
      'Can be used to use different ratios on mobile and desktop. If empty, the mobile media will be used for both.',
  });

  cMedia.changeFieldControl('desktop_ratio', 'builtin', 'dropdown', {
    helpText: 'Select a ratio for desktop. Leave empty to use original media dimensions.',
  });

  cMedia.changeFieldControl('desktop_focus_area', 'builtin', 'dropdown', {
    helpText: 'Choose a focus area that will be used for resizing. Default is "center".',
  });

  cMedia.changeFieldControl('lazy', 'builtin', 'boolean', {});
});
