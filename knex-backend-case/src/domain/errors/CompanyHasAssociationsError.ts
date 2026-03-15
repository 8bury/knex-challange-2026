class CompanyHasAssociationsError extends Error {
  readonly statusCode = 409;
  constructor() {
    super("Company still has members or products associated");
    this.name = "CompanyHasAssociationsError";
  }
}

export { CompanyHasAssociationsError };
