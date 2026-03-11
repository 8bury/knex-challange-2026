class InvalidFieldError extends Error {
  constructor(field: string, reason: string) {
    super(`Invalid field "${field}": ${reason}`);
    this.name = "InvalidFieldError";
  }
}

export { InvalidFieldError };
