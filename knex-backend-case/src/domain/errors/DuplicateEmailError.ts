class DuplicateEmailError extends Error {
  readonly statusCode = 409;
  constructor() {
    super("Email already registered");
    this.name = "DuplicateEmailError";
  }
}

export { DuplicateEmailError };
