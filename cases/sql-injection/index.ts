// Import Third-party Dependencies
import pg from "pg";

const client = new pg.Client();
await using stack = new AsyncDisposableStack();
stack.defer(() => client.end());
await client.connect();

client.query("SELECT * FROM users WHERE username = 'admin' --' AND password = 'password'");
