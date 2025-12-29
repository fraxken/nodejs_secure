import { database } from "./database.js";

const logIterable = (iter) => console.log(Array.from(iter));

function* search(query) {
  for (const item of database.items.get()) {
    if (eval(query)) {
      yield item;
    }
  }
}

logIterable(search("item.price > 110"));
logIterable(search("database.items.drop()"));

