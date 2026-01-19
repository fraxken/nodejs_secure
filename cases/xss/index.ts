// Import Node.js Dependencies
import { createServer } from "node:http";

// Import Third-party Dependencies
import open from "open";

const server = createServer((req, res) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const name = url.searchParams.get("name") ?? "World";

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<!DOCTYPE html>
<html>
<head>
    <title>XSS Demo</title>
</head>
<body>
    <h1>Hello, ${escape}!</h1>
</body>
</html>`);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  const link = "http://localhost:3000/?name=<script>alert('XSS')</script>";

  console.log(`Test XSS: ${link}`);
  open(link);
});
