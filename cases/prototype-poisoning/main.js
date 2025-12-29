const text = '{ "b": 5, "__proto__": { "c": 6 } }';
const obj = JSON.parse(text);
console.log(obj);
