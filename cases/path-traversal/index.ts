import {
  createServer,
  type IncomingMessage,
  type ServerResponse
} from "node:http";
import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream";

const serveFile = createServing(
  path.join(import.meta.dirname, "public")
);

const server = createServer((req, res) => {
  serveFile(req, res, () => {
    res.statusCode = 404;
    res.end();
  });
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

function createServing(dirname: string): Middleware {
  const basePath = path.resolve(dirname);

  return (req, res, next) => {
    const { method, url } = req;

    if (method === "GET" && url) {
      const assetPath = path.join(basePath, url);

      const fileExists = fs.existsSync(assetPath);
      if (!fileExists) {
        res.statusCode = 404;
        res.end();
        return;
      }

      pipeline(
        fs.createReadStream(assetPath),
        res,
        (err) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
          }
          else {
            next();
          }
        }
      );
    }
    else {
      next();
    }
  }
}