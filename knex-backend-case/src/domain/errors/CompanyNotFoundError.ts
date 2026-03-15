class CompanyNotFoundError extends Error {
  readonly statusCode = 404;
  constructor() {
    super("Company not found");
    this.name = "CompanyNotFoundError";
  }
}

export { CompanyNotFoundError };
