# Defensive Coding exercise

Hi! 

Have you heard of software supply chain? Yes, that's the thing where it turns out you're responsible for what your app takes from the node_modules folder afterall. Today we're going to assume all the auditing tools have failed and you've got malicious code running in your app's process. Whatever color your hat is, you better hold on to it.

Now imagine you've inherited a codebase written in JavaScript.

*We don't want to scare you, so this is not going to be an actual awful pile of legacy code. Just a small module that's not entirely realistic, but easier to grasp than a real project would be.*

Here is a snippet showing how this module can be used:

```ts
import { makeAuthzManager } from "./authz.js";

const au = makeAuthzManager();

au.setSecrets(["secret1", "secret2"]);

try {
  au.guessSecret("wrong");
}
catch (e) {
  console.log("failed to guess the secret", e);
}

au.authorizedFetch([
  {
    url: "https://example.com/one",
    headers: {},
    method: "GET"
  },
  {
    url: "https://example.com/two",
    headers: {},
    method: "GET"
  }
]);
```

Your module is running alongside some dependencies tha the rest of the app is pulling in. What if they're malicious? 👿

## Preparation for training

- make sure you understand where the map function is coming to your newly created Array `[].map` and overall what prototypes are in JavaScript https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
- install Node.js 22+ and npm
- test out running the first attack from the exercise to make sure it works

## The challenge: 
- defend your code from attacks one by one.
- you can only modify authz.js
- you can't change the logic of how it works (run `npm run assert` to verify)
- it's legacy code, so no major rewrites! 

*Sidenote: you can defeat some of the attacks by changing names of some fields or refactoring to for loops, but where's the fun in that, right?*

`attacks/` folder contains all the attacks and it's a good idea to look at the one you are currently running to see what you're dealing with. 

We'll go step-by-step through the exercises, so you need to know how to run them. Numbers start at zero.

The easiest way is to run them with `npm test 0` where you pass the number of the attack you wish to run as an argument.  
