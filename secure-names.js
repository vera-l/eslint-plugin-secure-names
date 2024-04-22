const RE = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$_]).+$/);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Небезопасные имена паременных не допускаются",
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
        'Имя переменной "{{ variable }}" должно быть безопасным и содержать как минимум {{ minLength }} букв (строчных и прописных), цифр и специальных символов ("$" или "_").',
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
