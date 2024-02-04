import {
  highlightText,
  setTheme
} from "https://deno.land/x/speed_highlight_js@v1.2.4/dist/terminal.js";
import LoggerUtils from "../packages/logger-utils/src/LoggerUtils.ts";
import { getLogger } from "https://deno.land/std@0.214.0/log/mod.ts";

LoggerUtils.defineLogger("my-awesome-module", "NOTSET");


let myLogger = getLogger("my-awesome-module");

export function sum(a: number, b: number) {
  myLogger.info(`running ${a} + ${b}`);
  return a + b;
}

//myLogger = LoggerUtils.createLogger("my-awesome-module", "INFO");

export function mult(a: number, b: number) {
  myLogger.error(`running ${a} * ${b}`);
  return a * b;
}

sum(1, 2);
mult(1, 2);

//getLogger().info({ foo: "bar" });

await setTheme("default");
const test = await highlightText(
  `INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');`,
  "sql"
);

myLogger.info(test);
