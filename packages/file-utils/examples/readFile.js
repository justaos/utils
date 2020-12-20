const { default: FileUtils } = require("../lib/index");

const obj = FileUtils.readJsonFileSync("../test/resources/sample.json");
console.log(JSON.stringify(obj, null, 4)); // prints content of sample.json