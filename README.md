# justaos's Utils

Common utility functions used across projects.

![GitHub release (with filter)](https://img.shields.io/github/v/release/justaos/utils?label=Release)
[![Build](https://github.com/justaos/utils/workflows/Build/badge.svg)](https://github.com/justaos/utils/actions?workflow=Build)
[![Coverage](https://codecov.io/gh/justaos/utils/branch/main/graph/badge.svg?token=OzlniGFmNp)](https://codecov.io/gh/justaos/utils)
[![License](https://img.shields.io/github/license/justaos/utils.svg?label=License)](/LICENSE)

## File Utils

```js
import FileUtils from "https://deno.land/x/justaos_utils@v1.5.1/packages/file-utils/mod.ts";
const obj = FileUtils.readJsonFileSync("./sample.json");
console.log(JSON.stringify(obj, null, 4)); // prints content of sample.json
```

## String Utils

```js
import CommonUtils from "https://deno.land/x/justaos_utils@v1.5.1/packages/common-utils/mod.ts";
const temp = CommonUtils.underscoreToCamelCase("hello_world");
console.log(temp); // prints 'Hello World'
```

## Date Utils

```js
import DateUtils from "https://deno.land/x/justaos_utils@v1.5.1/packages/date-utils/mod.ts";
const isIso = DateUtils.isIsoDate("2022-12-27T07:40:25.551Z");
console.log(isIso); // prints true
```

## Code of Conduct

[Contributor Covenant](/CODE_OF_CONDUCT.md)
