export class BruteForceProtectionError extends Error {
  constructor(
    message: string,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = "BruteForceProtectionError";
  }
}

export class TooManyFailedAttemptsError extends BruteForceProtectionError {
  readonly identifier: string;
  readonly attempts: number;

  constructor(
    identifier: string,
    attempts: number
  ) {
    super(`Too many failed attempts for "${identifier}" (${attempts} attempts)`);
    this.name = "TooManyFailedAttemptsError";
    this.identifier = identifier;
    this.attempts = attempts;
  }
}
