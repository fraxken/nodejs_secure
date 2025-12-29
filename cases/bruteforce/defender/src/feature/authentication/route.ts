// Import Third-party Dependencies
import type { FastifyInstance } from "fastify";

// Import Internal Dependencies
import * as controller from "./controller.ts";
import * as schema from "./schema.ts";

export default async function api(server: FastifyInstance) {
  server.post(
    "/",
    { schema: schema.authenticate },
    controller.authenticate
  );
}

export const autoPrefix = "/authenticate";
