import v8 from "node:v8";

v8.setFlagsFromString("--enable-experimental-regexp_engine-on-excessive-backtracks");

const vulnerableRegex = /([a-z]+)+$/;

console.time("executionTime");
vulnerableRegex.test("a".repeat(10000) + "!");
console.timeEnd("executionTime");

