/* eslint-env node */
const { withHelpers } = require('@jungvonmatt/contentful-migrations');

/**
 * Migration to generate the d-settings object with id 'settings' so it is available in contentful-ssg
 */
module.exports = withHelpers(async (_migration, context, helpers) => {
  const { makeRequest } = context;
  const defaultLocale = await helpers.locale.getDefaultLocale();

  // Create config object
  await makeRequest({
    method: 'PUT',
    url: `/entries/settings`,
    headers: { 'X-Contentful-Content-Type': 'd-settings' },
    data: {
      fields: {
        internal_name: {
          [defaultLocale.code]: 'Global settings',
        },
      },
    },
  });
});
