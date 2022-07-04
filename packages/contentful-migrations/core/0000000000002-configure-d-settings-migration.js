/* eslint-env node */

/**
 * Migration to generate the d-settings object with id 'settings' so it is available in contentful-ssg
 */
module.exports = async function (_migration, context) {
  const { makeRequest } = context;

  // Fetch locale
  const { items: locales } = await makeRequest({
    method: 'GET',
    url: '/locales',
  });
  const defaultLocale = locales.find((locale) => locale.default);

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
};
