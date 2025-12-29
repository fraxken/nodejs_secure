// Import Internal Dependencies
import { TooManyFailedAttemptsError } from "./BruteForceProtectionService.errors.ts";

export interface BruteForceProtectionServiceOptions {
  /**
   * Maximum number of failed attempts before blocking
   * @default 5
   */
  maxAttempts?: number;
}

export class BruteForceProtectionService {
  #failedAttempts: Map<string, number>;
  #maxAttempts: number;

  constructor(
    options: BruteForceProtectionServiceOptions = {}
  ) {
    this.#failedAttempts = new Map();
    this.#maxAttempts = options.maxAttempts ?? 5;
  }

  /**
   * Check if the identifier is blocked due to too many failed attempts.
   * @throws {TooManyFailedAttemptsError} if blocked
   */
  assertNotBlocked(identifier: string): void {
    const attempts = this.#failedAttempts.get(identifier) ?? 0;

    if (attempts >= this.#maxAttempts) {
      throw new TooManyFailedAttemptsError(identifier, attempts);
    }
  }

  recordFailure(identifier: string): void {
    const currentAttempts = this.#failedAttempts.get(identifier) ?? 0;
    this.#failedAttempts.set(identifier, currentAttempts + 1);
  }

  clearFailures(identifier: string): void {
    this.#failedAttempts.delete(identifier);
  }

  getFailureCount(identifier: string): number {
    return this.#failedAttempts.get(identifier) ?? 0;
  }
}
