/* eslint-env node */

/**
 * Contentful migration to create deploy content type
 */
module.exports = function (migration) {
  const deploy = migration
    .createContentType('x-deploy')
    .name('Deploy')
    .description('Depoy trigger')
    .displayField('name');
  deploy
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  deploy.changeFieldControl('name', 'builtin', 'singleLine', {});
};
