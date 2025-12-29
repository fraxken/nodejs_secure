// Import Third-party Dependencies
import type {
  FastifyInstance,
  FastifyPluginAsync
} from "fastify";
import fp from "fastify-plugin";

// Import Internal Dependencies
import { UserDatabase } from "../common/UserDatabase.ts";

class DatabaseClient {
  users = new UserDatabase();

  connect() {
    // Initialize the database connection
  }

  end() {
    // Close the database connection
  }
}

async function postgres(server: FastifyInstance) {
  const client = new DatabaseClient();

  client.connect();
  server.log.info("Succesfully connected to the database");

  server.addHook("onClose", () => {
    client.end();
  });
  server.decorate("dbClient", client);
}

export const databasePlugin: FastifyPluginAsync = fp(postgres, { name: "database" });

declare module "fastify" {
  interface FastifyInstance {
    dbClient: DatabaseClient;
  }
}
