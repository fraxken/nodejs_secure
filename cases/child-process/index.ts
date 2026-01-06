// Import Node.js Dependencies
import { execSync } from "node:child_process";

const userInput = process.argv[2] ?? "hello.txt";

const vulnerableCommand = `type ${userInput}`;

console.log(`Exécution de la commande: ${vulnerableCommand}\n`);

execSync(vulnerableCommand, { stdio: "inherit" });

/**
 * 🔴 EXEMPLES D'ATTAQUES (Windows):
 * 
 * Exécution normale:
 *   node index.ts package.json
 * 
 * Injection de commande - Chaîner plusieurs commandes:
 *   node index.ts "package.json && whoami"
 * 
 * 🟢 SOLUTION SÉCURISÉE:
 * - Utiliser execFileSync() ou spawnSync() avec des arguments séparés
 * - Valider/sanitiser strictement l'input utilisateur
 * - Utiliser une liste blanche de valeurs autorisées
 */
