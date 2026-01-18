import {
  scryptSync,
  randomBytes,
  timingSafeEqual
} from "node:crypto";

function hashPassword(
  password: string
): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);

  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

function verifyPassword(
  password: string,
  stored: string
): boolean {
  const [saltHex, hashHex] = stored.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const storedHash = Buffer.from(hashHex, "hex");
  const hash = scryptSync(password, salt, 64);

  return timingSafeEqual(storedHash, hash);
}

// Le salt rend chaque hash unique (protection rainbow tables)
const password = "monMotDePasse123";
console.log("Hash 1:", hashPassword(password));
console.log("Hash 2:", hashPassword(password));

// Vérification
const stored = hashPassword(password);
console.log("\nBon mot de passe:", verifyPassword(password, stored));
console.log("Mauvais mot de passe:", verifyPassword("mauvais", stored));
