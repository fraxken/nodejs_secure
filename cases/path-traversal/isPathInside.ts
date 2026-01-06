// Import Node.js Dependencies
import path from "node:path";

export function isPathInside(
  thePath: string,
  potentialParent: string
): boolean {
  // For inside-directory checking, we want to allow trailing slashes, so normalize.
  thePath = path.resolve(stripTrailingSep(thePath));
  potentialParent = path.resolve(stripTrailingSep(potentialParent));

  // Node treats only Windows as case-insensitive in its path module; we follow those conventions.
  if (process.platform === "win32") {
    thePath = thePath.toLowerCase();
    potentialParent = potentialParent.toLowerCase();
  }

  return thePath.startsWith(potentialParent) &&
    (
      thePath.at(potentialParent.length) === path.sep ||
      thePath.at(potentialParent.length) === undefined
    );
};

function stripTrailingSep(
  thePath: string
): string {
  return thePath.at(-1) === path.sep ? thePath.slice(0, -1) : thePath
}
