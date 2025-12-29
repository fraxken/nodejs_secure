// Import Third-party Dependencies
import type { FastifyRequest } from "fastify";

// Import Internal Dependencies
import type { User } from "../../common/UserDatabase.ts";
import { HttpError } from "../../plugins/error.ts";
import { AuthenticationService } from "./services/AuthenticationService.ts";
import {
  UserNotFoundError,
  InvalidPasswordError
} from "./services/AuthenticationService.errors.ts";

export async function authenticate(
  request: FastifyRequest<{ Body: User; }>
) {
  const { email, password } = request.body;

  const authService = new AuthenticationService({
    userDatabase: request.server.dbClient.users
  });

  try {
    return await authService.authenticate({ email, password });
  }
  catch (error) {
    if (error instanceof UserNotFoundError) {
      throw new HttpError("AUTH-ACCOUNT", {
        statusCode: 404,
        message: `User email "${error.email}" not found in the database`
      });
    }

    if (error instanceof InvalidPasswordError) {
      throw new HttpError("AUTH-PASSWORD", {
        statusCode: 401,
        message: `Invalid password for email "${error.email}"`
      });
    }

    throw error;
  }
}
