/* eslint-disable max-classes-per-file */

export class AuthenticationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "AuthenticationError";
  }
}

export class UserNotFoundError extends AuthenticationError {
  readonly email: string;

  constructor(email: string) {
    super(`User with email "${email}" not found`);
    this.name = "UserNotFoundError";
    this.email = email;
  }
}

export class InvalidPasswordError extends AuthenticationError {
  readonly email: string;

  constructor(email: string) {
    super(`Invalid password for user "${email}"`);
    this.name = "InvalidPasswordError";
    this.email = email;
  }
}
