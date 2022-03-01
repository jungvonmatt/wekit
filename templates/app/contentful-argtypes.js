const splitValues = (values) => {
  if (['number', 'string'].includes(typeof values)) {
    return `\`${values}\``;
  }

  if (Array.isArray(values)) {
    return values.map((value) => `\`${value}\``).join(', ');
  }

  return Object.entries(values)
    .map(([key, value]) => `${key}: \`${value}\``)
    .join(', ');
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

const getType = (field) => {
  return field?.type ?? 'string';
};

const isFieldIncluded = (field) => {
  const ignores = ['name', 'content_type', 'id', 'sys'];
  return !field.disabled && !field.omitted && field?.id && !ignores.includes(field?.id);
};

const getDescription = (field) => {
  const validations = formatValidations(field?.validations ?? []);
  const helpText = field?.settings?.helpText ?? '';

  return [helpText, validations].filter((v) => v).join('\n');
};

const getControl = (field) => {
  const result = { control: { type: null } };
  const type = field?.type;
  const widgetId = field?.widgetId;
  const validations = field?.validations ?? [];
  const { in: options = [] } = validations.find((validation) => Boolean(validation?.in)) || {};

  if (options.length) {
    result.control.type = widgetId === 'radio' ? 'radio' : 'select';
    result.options = options;
  }

  if (type === 'Boolean') {
    result.control.type = 'boolean';
  }

  if (['singleLine', 'multipleLine', 'markdown', 'slugEditor', 'urlEditor'].includes(widgetId)) {
    result.control.type = 'text';
  }

  if (widgetId === 'numberEditor') {
    const { range } = validations.find((validation) => Boolean(validation?.range)) || {};
    const { min, max } = range;
    result.control.type = 'number';

    if (typeof min !== 'undefined') {
      result.control.min = min;
    }

    if (typeof max !== 'undefined') {
      result.control.max = max;
    }

    if (type === 'Integer') {
      result.control.step = 1;
    }
  }

  return result;
};

module.exports = async (data) => {
  const fields = data?.fields ?? [];

  const argTypes = Object.fromEntries(
    fields
      .filter((field) => isFieldIncluded(field))
      .map((field) => {
        const definition = {
          name: field.name,
          type: { name: getType(field), required: field.required },
          description: getDescription(field),
          table: {
            type: { summary: getType(field) },
          },
          ...getControl(field),
        };

        const [defaultValue] = Object.values(field?.defaultValue ?? {});
        if (defaultValue) {
          definition.defaultValue = defaultValue;
          definition.table.defaultValue = { summary: defaultValue };
        }

        return [field.id, definition];
      })
      .filter(([, definition]) => definition?.control?.type)
  );

  return JSON.stringify(argTypes, null, '  ');
};
