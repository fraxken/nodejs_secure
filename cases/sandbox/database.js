export const database = {
  items: {
    raw: [
      { id: 1, name: 'Item 1', price: 100 },
      { id: 2, name: 'Item 2', price: 200 },
      { id: 3, name: 'Item 3', price: 120 },
      { id: 4, name: 'Item 4', price: 40 },
    ],
    get() {
      return this.raw;
    },
    drop() {
      this.raw = [];
    }
  }
};
