const splitValues = (values) => {
  return values.map((value) => `\`${value}\``).join(', ');
};

const formatValidations = (validations) => {
  let formattedValidation = '';
  for (const validation of validations) {
    if (validation.size) {
      formattedValidation += `**Allowed size:** ${splitValues(validation.size)}. `;
    } else if (validation.enabledNodeTypes) {
      formattedValidation += `**Allowed node types:** ${splitValues(validation.enabledNodeTypes)}. `;
    } else if (validation.enabledMarks) {
      formattedValidation += `**Allowed marks:** ${splitValues(validation.enabledMarks)}. `;
    } else if (validation.linkContentType) {
      formattedValidation += `**Allowed content types:** ${splitValues(validation.linkContentType)}. `;
    } else if (validation.linkMimetypeGroup) {
      formattedValidation += `**Allowed file types:** ${splitValues(validation.linkMimetypeGroup)}. `;
    } else if (validation.in) {
      formattedValidation += `**Allowed values:** ${splitValues(validation.in)}. `;
    } else if (validation.regexp) {
      formattedValidation += `**Regex:** ${JSON.stringify(validation.regexp.pattern)}. `;
    } else {
      formattedValidation += `${JSON.stringify(validation)}. `;
    }
  }

  // Escape pipes
  formattedValidation = formattedValidation.replace(/\|/g, '&#124;');

  return formattedValidation;
};

module.exports = async (data) => {
  const { markdownTable: table } = await import('markdown-table');
  const fields = data?.fields;

  return table([
    ['Name', 'ID', 'Type', 'Required', 'Localized', 'Validations', 'Help text'],
    ...fields.map((field) => {
      const { id, name, type, required, localized, validations, settings } = field;
      return [
        name,
        id,
        type,
        required ? '✓' : '',
        localized ? '✓' : '',
        formatValidations(validations),
        settings?.helpText,
      ];
    }),
  ]);
};
