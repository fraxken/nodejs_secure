// Import Third-party Dependencies
import argon2 from "argon2";

// Import Internal Dependencies
import type { UserDatabase } from "../../../common/UserDatabase.ts";
import {
  UserNotFoundError,
  InvalidPasswordError
} from "./AuthenticationService.errors.ts";

export interface AuthenticatePayload {
  email: string;
  password: string;
}

export interface AuthenticateResult {
  accessToken: string;
}

export interface AuthenticationServiceDependencies {
  userDatabase: UserDatabase;
}

export class AuthenticationService {
  #userDatabase: UserDatabase;

  constructor(
    dependencies: AuthenticationServiceDependencies
  ) {
    this.#userDatabase = dependencies.userDatabase;
  }

  async authenticate(
    payload: AuthenticatePayload
  ): Promise<AuthenticateResult> {
    const { email, password } = payload;

    const user = this.#userDatabase.getUserByEmail(email);
    if (!user) {
      throw new UserNotFoundError(email);
    }

    const passwordIsMatching = await argon2.verify(user.password, password);
    if (!passwordIsMatching) {
      throw new InvalidPasswordError(email);
    }

    return {
      accessToken: "..."
    };
  }
}
