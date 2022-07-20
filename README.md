# justaos's Utils

Common utility functions used across projects.

 [![Build](https://github.com/justaos/utils/workflows/Build/badge.svg)](https://github.com/justaos/utils/actions?workflow=Build)
[![Coverage Status](https://coveralls.io/repos/github/justaos/utils/badge.svg?branch=master)](https://coveralls.io/github/justaos/utils?branch=master)

## File Utils

```js
import FileUtils from 'https://raw.githubusercontent.com/justaos/utils/1.1.0/logger-utils/mod.ts';
const obj = FileUtils.readJsonFileSync("../test/resources/sample.json");
console.log(JSON.stringify(obj, null, 4)); // prints content of sample.json
```

## String Utils

```js
import CommonUtils from 'https://raw.githubusercontent.com/justaos/utils/1.1.0/common-utils/mod.ts';
const temp = CommonUtils.underscoreToCamelCase('hello_world');
console.log(temp); // prints 'Hello World'
```

## Code of Conduct

[Contributor Covenant](/CODE_OF_CONDUCT.md)

## License

[Apache License 2.0](/LICENSE)
