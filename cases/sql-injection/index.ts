// Import Node.js Dependencies
import http from "node:http";
import consumers from "node:stream/consumers";

// Import Third-party Dependencies
import pg from "pg";

const client = new pg.Client({
  host: "localhost",
  database: "vulnerable_db",
  user: "postgres",
  password: "postgres",
});

await client.connect();

await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100)
  )
`);
await client.query(`
  INSERT INTO users (username, password) VALUES
    ('admin', 'secret123'),
    ('alice', 'alice456'),
    ('bob', 'bob789'),
    ('charlie', 'charlie000')
  ON CONFLICT (username) DO NOTHING
`);

const server = http.createServer(async (req, res) => {
  const body = await consumers.json(req) as {
    username: string;
    password: string
  };

  const { username, password } = body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log("SQL exécuté:", query);

  try {
    const result = await client.query(query);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: result.rows.length > 0, users: result.rows }));
  }
  catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: (err as Error).message }));
  }
});

server.listen(3000, () => {
  console.log("🔓 API sur http://localhost:3000");
  console.log("POST / avec {username, password}");
});
