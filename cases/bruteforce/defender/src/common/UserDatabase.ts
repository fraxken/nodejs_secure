// Import Third-party Dependencies
import argon2 from "argon2";

export type User = {
  email: string;
  password: string;
};

export class UserDatabase {
  #users = new Map<string, User>();

  async initialize(): Promise<void> {
    this.addUser({
      email: "admin@example.com",
      password: await argon2.hash("F@obar@x$8513")
    });
  }

  addUser(user: User): void {
    this.#users.set(user.email, user);
  }

  getUserByEmail(email: string): User | null {
    return this.#users.get(email) || null;
  }
}
