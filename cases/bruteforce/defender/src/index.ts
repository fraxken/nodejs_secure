// Import Internal Dependencies
import { buildServer } from "./app.ts";

const server = await buildServer();
await server.listen({ port: 1337 });
