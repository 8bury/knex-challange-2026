class DuplicateCompanyNameError extends Error {
  constructor() {
    super("Company name already exists");
    this.name = "DuplicateCompanyNameError";
  }
}

export { DuplicateCompanyNameError };
