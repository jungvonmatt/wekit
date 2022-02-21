/* eslint-env node */
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const readJsonAsync = async (filepath, options) => {
  const content = await readFileAsync(filepath, options);
  return JSON.parse(content);
};

/**
 * Contentful migration
 */
module.exports = async function (migration, context) {
  const { makeRequest } = context;
  // Check if deploy-with-confirmation extension is installed
  const { items: extensions } = await makeRequest({
    method: 'GET',
    url: '/extensions',
  });
  // Add extension
  if (!extensions.flatMap((e) => [e.sys.id, e.extension.name]).includes('multi-text')) {
    const dir = path.join(__dirname, '../ui-extensions/multi-text');
    const { id, ...extension } = await readJsonAsync(path.join(dir, 'extension.json'));
    extension.srcdoc = await readFileAsync(path.join(dir, extension.srcdoc), 'utf8');

    await makeRequest({
      method: 'PUT',
      url: id ? `/extensions/${id}` : '/extensions',
      data: { extension },
    });
  }
};
