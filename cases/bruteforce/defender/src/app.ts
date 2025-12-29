// Import Node.js Dependencies
import path from "node:path";

// Import Third-party Dependencies
import fastify, { type FastifyInstance } from "fastify";
import autoLoad from "@fastify/autoload";

// Import Internal Dependencies
import { databasePlugin } from "./plugins/database.ts";
import { errorPlugin } from "./plugins/error.ts";

export async function buildServer(): Promise<FastifyInstance> {
  const server = fastify({
    disableRequestLogging: true,
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          ignore: "pid,reqId"
        }
      }
    }
  });

  server.addHook("onRequest", async(request) => {
    if (request.method !== "OPTIONS") {
      request.log.info(`(${request.id}) receiving request "${request.method} ${request.raw.url}"`);
    }
  });

  server.addHook("onResponse", async(request, reply) => {
    if (request.method !== "OPTIONS") {
      const responseTime = reply.elapsedTime.toFixed(3);

      request.log.info(
        `response returned "${request.method} ${request.raw.url}",`
        + ` statusCode: ${reply.raw.statusCode} (${responseTime}ms)`
      );
    }
  });

  // server.register(fastifyRateLimit, {
  //   global: true,
  //   max: 20,
  //   timeWindow: 1_000 * 60
  // });
  await server.register(databasePlugin);
  server.register(errorPlugin);

  server.register(autoLoad, {
    dir: path.join(import.meta.dirname, "./feature"),
    dirNameRoutePrefix: false,
    ignorePattern: /.*(test|spec).ts/,
    indexPattern: /route(\.ts|\.js)$/,
    autoHooks: false,
    options: {
      prefix: "/api"
    }
  });

  server.get("/health", async() => {
    return { uptime: process.uptime() };
  });

  return server;
}
