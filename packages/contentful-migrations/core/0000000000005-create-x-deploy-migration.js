/* eslint-env node */

/**
 * Contentful migration to create deploy content type
 */
module.exports = function (migration) {
  const deploy = migration
    .createContentType('x-deploy')
    .name('Deploy')
    .description('Depoy trigger')
    .displayField('internal_name');

  deploy
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  deploy.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Deploy to preview"',
  });
};
