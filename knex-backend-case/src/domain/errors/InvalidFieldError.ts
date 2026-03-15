class InvalidFieldError extends Error {
  readonly statusCode = 422;
  constructor(field: string, reason: string) {
    super(`Invalid field "${field}": ${reason}`);
    this.name = "InvalidFieldError";
  }
}

export { InvalidFieldError };
