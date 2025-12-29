const vulnerableRegex = /([a-z]+)+$/;

console.time("executionTime");
/([a-z]+)+$/.test("a".repeat(1000) + "!");
console.timeEnd("executionTime");
