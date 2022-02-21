module.exports = {
  prompt({ prompter, args }) {
    const prompts = [
      {
        type: 'input',
        name: 'contentType',
        message: 'Content type (e.g. "c-button")',
        initial: args.c || args['content-type'],
        skip: Boolean(args.c || args.contentType),
        validate(value) {
          if (!['c-', 'm-', 't-'].includes(value.slice(0, 2))) {
            return 'Content type should start with "c-", "m-" or "t-"';
          }

          return true;
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'Variation name',
        initial: args.n || args.name || 'default',
        skip: true,
      },
    ];

    return prompter.prompt(prompts).then((answers) => {
      const { contentType } = answers;

      if (contentType.startsWith('c-')) {
        answers.category = 'components';
      } else if (contentType.startsWith('m-')) {
        answers.category = 'modules';
      } else if (contentType.startsWith('t-')) {
        answers.category = 'templates';
      }

      return answers;
    });
  },
};
