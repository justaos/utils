import {FileUtils} from "https://deno.land/x/justaos_utils@v1.5.1/mod.ts";
const obj = FileUtils.readJsonFileSync("../package.json");
console.log(JSON.stringify(obj, null, 4));


import {CommonUtils} from "https://deno.land/x/justaos_utils@v1.5.1/mod.ts";
const temp = CommonUtils.underscoreToCamelCase("hello_world");
console.log(temp);


import {DateUtils} from "https://deno.land/x/justaos_utils@v1.5.1/mod.ts";
const isIso = DateUtils.isIsoDate("2022-12-27T07:40:25.551Z");
console.log(isIso); // prints true
