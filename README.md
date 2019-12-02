# Anysols Utils
Common utility functions used across anysols projects

[![Build](https://github.com/anysols/anysols-utils/workflows/Node%20CI/badge.svg)](https://github.com/anysols/anysols-utils/actions?workflow=Node+CI)
[![Coverage Status](https://coveralls.io/repos/github/anysols/anysols-utils/badge.svg?branch=master)](https://coveralls.io/github/anysols/anysols-utils?branch=master)
[![CodeFactor](https://www.codefactor.io/repository/github/anysols/anysols-utils/badge)](https://www.codefactor.io/repository/github/anysols/anysols-utils)

## File Utils
```js
//  Read a json file
const utils = require('@anysols/utils');
let obj = utils.readJsonFileSync('test/resources/sample.json');
console.log(JSON.stringify(obj)); // prints content of sample.json


//  Write to a json file
utils.writeJsonFileSync('test/resources/_temp_/write.json', {title: 'Write'});
let obj = utils.readJsonFileSync('test/resources/_temp_/write.json');
console.log(JSON.stringify(obj)); // prints {title: 'Write'}
```

## String Utils
```js
const utils = require('@anysols/utils');
const temp = utils.underscoreToCamelCase('hello_world');
console.log(temp); // prints 'Hello World'
```

## Code of Conduct
[Contributor Covenant](/CODE_OF_CONDUCT.md)

## License
[Apache License 2.0](/LICENSE)
