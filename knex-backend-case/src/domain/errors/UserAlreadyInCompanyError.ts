class UserAlreadyInCompanyError extends Error {
  constructor() {
    super("User is already linked to a company");
    this.name = "UserAlreadyInCompanyError";
  }
}

export { UserAlreadyInCompanyError };
