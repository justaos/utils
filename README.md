# plt4rm's Utils
Common utility functions used across plt4rm projects.

[![Version](https://img.shields.io/npm/v/@plt4rm/utils)](https://img.shields.io/npm/v/@plt4rm/utils)
[![Build](https://github.com/plt4rm/utils/workflows/Node%20CI/badge.svg)](https://github.com/plt4rm/utils/actions?workflow=Node+CI)
[![Coverage Status](https://coveralls.io/repos/github/plt4rm/utils/badge.svg?branch=master)](https://coveralls.io/github/plt4rm/utils?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/plt4rm/utils/badge)](https://www.codefactor.io/repository/github/plt4rm/utils)

## File Utils
```js
//  Read a json file
const utils = require('@plt4rm/utils');
let obj = utils.readJsonFileSync('test/resources/sample.json');
console.log(JSON.stringify(obj)); // prints content of sample.json


//  Write to a json file
utils.writeJsonFileSync('test/resources/_temp_/write.json', {title: 'Write'});
let obj = utils.readJsonFileSync('test/resources/_temp_/write.json');
console.log(JSON.stringify(obj)); // prints {title: 'Write'}
```

## String Utils
```js
const utils = require('@plt4rm/utils');
const temp = utils.underscoreToCamelCase('hello_world');
console.log(temp); // prints 'Hello World'
```

## Code of Conduct
[Contributor Covenant](/CODE_OF_CONDUCT.md)

## License
[Apache License 2.0](/LICENSE)
