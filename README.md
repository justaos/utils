# justaos's Utils

Common utility functions used across projects.

[![Build](https://github.com/justaos/utils/workflows/Build/badge.svg)](https://github.com/justaos/utils/actions?workflow=Build)
[![Coverage Status](https://coveralls.io/repos/github/justaos/utils/badge.svg?branch=master)](https://coveralls.io/github/justaos/utils?branch=master)

## File Utils

```js
const obj = FileUtils.readJsonFileSync("../test/resources/sample.json");
console.log(JSON.stringify(obj, null, 4)); // prints content of sample.json
```

## String Utils

```js
const {CommonUtils} = require('@justaos/utils');
const temp = CommonUtils.underscoreToCamelCase('hello_world');
console.log(temp); // prints 'Hello World'
```

## Code of Conduct

[Contributor Covenant](/CODE_OF_CONDUCT.md)

## License

[Apache License 2.0](/LICENSE)
