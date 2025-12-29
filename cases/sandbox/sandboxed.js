import { database } from "./database.js";
import "ses";

const logIterable = (iter) => console.log(Array.from(iter));

lockdown();

const compartement = new Compartment();
harden(compartement.globalThis);

const SafeFunction = compartement.globalThis.Function;

function* search(query) {
  const match = new SafeFunction("item", `return ${query};`);

  for (const item of database.items.get()) {
    const hardenedItem = harden(item);

    if (match(hardenedItem)) {
      yield hardenedItem;
    }
  }
}

logIterable(search("item.price > 110"));
logIterable(search("database.items.drop()"));
console.log(database.items.get());
