const rawSource = '{ "hello": "world", "__proto__": { "ooops": "oh no!" } }';
const parsedSource = JSON.parse(rawSource);
console.log(parsedSource);

const assignedSource = Object.assign({}, parsedSource);
console.log(assignedSource);
console.log(assignedSource.ooops);
