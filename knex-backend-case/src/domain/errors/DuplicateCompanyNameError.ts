class DuplicateCompanyNameError extends Error {
  readonly statusCode = 409;
  constructor() {
    super("Company name already exists");
    this.name = "DuplicateCompanyNameError";
  }
}

export { DuplicateCompanyNameError };
