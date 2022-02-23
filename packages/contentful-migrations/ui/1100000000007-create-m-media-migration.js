module.exports = function (migration) {
  const mMedia = migration
    .createContentType('m-media')
    .name('Module: Media')
    .description('Module wrapper for media component')
    .displayField('name');
  mMedia
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mMedia
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

  mMedia
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

  mMedia
    .createField('layout')
    .name('Module layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['default'],
      },
    ])
    .defaultValue({
      en: 'default',
    })
    .disabled(false)
    .omitted(false);

  mMedia
    .createField('body')
    .name('Module body')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['c-image', 'c-media', 'c-video'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  mMedia.changeFieldControl('name', 'builtin', 'singleLine', {});
  mMedia.changeFieldControl('header', 'builtin', 'entryLinkEditor', {});

  mMedia.changeFieldControl('settings', 'builtin', 'entryLinkEditor', {
    helpText: 'Theme, Spacings, ...',
    showLinkEntityAction: true,
    showCreateEntityAction: true,
  });

  mMedia.changeFieldControl('layout', 'builtin', 'dropdown', {});
  mMedia.changeFieldControl('body', 'builtin', 'entryLinkEditor', {});
};
