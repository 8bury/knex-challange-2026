class CompanyHasAssociationsError extends Error {
  constructor() {
    super("Company still has members or products associated");
    this.name = "CompanyHasAssociationsError";
  }
}

export { CompanyHasAssociationsError };
