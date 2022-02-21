module.exports = function (migration) {
  const contentfulMigrations = migration
    .createContentType('contentful-migrations')
    .name('Migrations')
    .description('Internal data model holding references to all migrations')
    .displayField('version');

  contentfulMigrations
    .createField('version')
    .name('Version')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  contentfulMigrations
    .createField('name')
    .name('Name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  contentfulMigrations
    .createField('state')
    .name('State')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['success', 'failure'],
      },
    ])
    .disabled(false)
    .omitted(false);

  contentfulMigrations
    .createField('message')
    .name('Message')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
};
