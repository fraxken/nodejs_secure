export type User = {
  email: string;
  password: string;
};

export class UserDatabase {
  #users: Map<string, User>;

  constructor() {
    this.#users = new Map();
    this.addUser({
      email: "admin@example.com",
      password: "F@obar@x$8513"
    });
  }

  addUser(user: User): void {
    this.#users.set(user.email, user);
  }

  getUserByEmail(email: string): User | null {
    return this.#users.get(email) || null;
  }
}
