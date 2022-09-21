const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const cVideo = migration
    .createContentType('c-video-player')
    .name('Component: Video player')
    .description('A video player which can play videos from Contentful, YouTube or Vimeo.')
    .displayField('internal_name');

  cVideo
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  cVideo
    .createField('src')
    .name('Src')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cVideo
    .createField('asset')
    .name('Asset')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cVideo
    .createField('poster')
    .name('Poster')
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

  cVideo
    .createField('track')
    .name('Text track')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset');

  cVideo
    .createField('autoplay')
    .name('Autoplay')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      [defaultLocale.code]: false,
    })
    .disabled(false)
    .omitted(false);

  cVideo
    .createField('muted')
    .name('Muted')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      [defaultLocale.code]: false,
    })
    .disabled(false)
    .omitted(false);

  cVideo
    .createField('loop')
    .name('Loop')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      [defaultLocale.code]: false,
    })
    .disabled(false)
    .omitted(false);

  cVideo
    .createField('controls')
    .name('Controls')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .defaultValue({
      [defaultLocale.code]: true,
    })
    .disabled(false)
    .omitted(false);

  cVideo.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Stage > Video"',
  });

  cVideo.changeFieldControl('src', 'builtin', 'singleLine', {});

  cVideo.changeFieldControl('asset', 'builtin', 'assetLinkEditor', {});

  cVideo.changeFieldControl('poster', 'builtin', 'assetLinkEditor', {});

  cVideo.changeFieldControl('track', 'builtin', 'assetLinkEditor', {
    helpText: 'Simple text file containing the actual subtitle data in the WebVTT format.',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  cVideo.changeFieldControl('autoplay', 'builtin', 'boolean', {});

  cVideo.changeFieldControl('muted', 'builtin', 'boolean', {});

  cVideo.changeFieldControl('loop', 'builtin', 'boolean', {});

  cVideo.changeFieldControl('controls', 'builtin', 'boolean', {});
});
