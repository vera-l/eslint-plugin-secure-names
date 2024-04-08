const rule = require("./secure-names");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("secure-names", rule, {
  valid: ["var AbCd35$0;", "let At84_567Sd;", "const jsP32__920 = 10;"],
  invalid: [
    {
      code: "const aC$ = 123;",
      errors: [
        {
          messageId: "insecureName",
        },
      ],
    },
    {
      code: "let $var_name123;",
      errors: [
        {
          messageId: "insecureName",
        },
      ],
    },
    {
      code: "var VAR_NAME_3;",
      errors: [
        {
          messageId: "insecureName",
        },
      ],
    },
  ],
});
