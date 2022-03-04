/* eslint-env node */
const { runner, Logger } = require('hygen');
const pc = require('picocolors');
const fs = require('fs-extra');
const { Confirm } = require('enquirer');
const path = require('path');
const dotenv = require('dotenv');
const defaultTemplates = path.join(__dirname, '_templates');

dotenv.config();

(async () => {
  const data = await runner(process.argv.slice(2), {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    createPrompter: () => require('enquirer'),
    exec(action, body) {
      const opts = body && body.length > 0 ? { input: body } : {};
      return require('execa').shell(action, opts);
    },
    debug: Boolean(process.env.DEBUG),
  });

  const regexp = /layouts\/partials\/(?:components|modules|templates)\/([cmt]-.*).html/;
  const { actions } = data;
  const { subject } = actions.find(({ subject }) => regexp.test(subject)) || {};
  const [, contentType] = regexp.exec(subject || '') || [];

  if (!contentType) {
    return;
  }

  console.log();
  const prompt = new Confirm({
    name: 'addFakes',
    message: `Do you want to generate storybook fake data based on your contentful model`,
  });

  const addFakes = await prompt.run();
  if (!addFakes) {
    return;
  }

  console.log();

  const { createFakes } = await import('@jungvonmatt/contentful-fakes');
  const { stringify } = await import('@jungvonmatt/contentful-ssg/converter');
  const fakes = await createFakes([contentType]);
  if (!Object.keys(fakes).length) {
    console.log(`${pc.red(0)} files generated!`);
    console.log(`No content model found for: ${pc.cyan(contentType)}`);
  }

  await Promise.all(
    Object.entries(fakes).map(async ([contentTypeId, fakeData]) => {
      const [data] = fakeData;
      const dir = path.join('data/storybook', contentTypeId);
      const filename = path.join(dir, `default.yaml`);

      await fs.outputFile(filename, stringify(data, 'yaml'));
      console.log(pc.green(`       added: ${filename}`));
    })
  );
})();
