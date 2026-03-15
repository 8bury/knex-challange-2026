class UserAlreadyInCompanyError extends Error {
  readonly statusCode = 409;
  constructor() {
    super("User is already linked to a company");
    this.name = "UserAlreadyInCompanyError";
  }
}

export { UserAlreadyInCompanyError };
