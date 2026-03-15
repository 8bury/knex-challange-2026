class InvalidCredentialsError extends Error {
  readonly statusCode = 401;
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidCredentialsError";
  }
}

export { InvalidCredentialsError };
