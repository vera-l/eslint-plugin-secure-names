# Secure names eslint rule

A variable name should be secure and contain at least {minLength} symbols: letters (uppercase and lowercase), digits and special symbols ("$" or "\_").

### Options

```js
{
  "rules": {
    // ...
    "secure-names/secure-names": ["error", {
      minLength: 10, // minimum allowed variable name length (default: 8)
    }],
  }
}
```

### Valid

```js
var AbCd35$0;
let At84_567Sd;
const jsP32__920;
```

### Invalid

```js
const aC$ = 123; // too short
let $var_name123; // there is no at least one uppercase letter
var VAR_NAME_3; // there is no at least one special symbol
```
