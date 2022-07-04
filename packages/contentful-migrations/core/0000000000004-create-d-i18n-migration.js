module.exports = function (migration) {
  const dI18n = migration
    .createContentType('d-i18n')
    .name('Data: i18n')
    .description('Key value store for i18n')
    .displayField('key');

  dI18n
    .createField('key')
    .name('Key')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  dI18n
    .createField('other')
    .name('Value')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  dI18n
    .createField('one')
    .name('Singular value')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  dI18n.changeFieldControl('key', 'builtin', 'singleLine', {});
  dI18n.changeFieldControl('other', 'builtin', 'singleLine', {});
  dI18n.changeFieldControl('one', 'builtin', 'singleLine', {
    helpText: 'Optionally pass a dedicated singular value',
  });
};
