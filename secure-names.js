const RE = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$_]).+$/);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow using insecure variable names",
    },
    schema: [
      {
        type: "object",
        properties: {
          minLength: { type: "number" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      insecureName:
        'A variable "{{ variable }}" name should be secure and contain at least {{ minLength }} letters (uppercase and lowercase), digits and special symbols ("$" or "_").',
    },
  },
  create(context) {
    const minLength = context.options[0]?.minLength || 8;
    return {
      VariableDeclarator(node) {
        if (
          node.parent.kind === "let" ||
          node.parent.kind === "var" ||
          node.parent.kind === "const"
        ) {
          if (
            node.id.type === "Identifier" &&
            (node.id.name.length < minLength || !node.id.name.match(RE))
          ) {
            context.report({
              node,
              messageId: "insecureName",
              data: {
                variable: node.id.name,
                minLength,
              },
            });
          }
        }
      },
    };
  },
};
