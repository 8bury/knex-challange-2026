class UserNotInCompanyError extends Error {
  readonly statusCode = 409;
  constructor() {
    super("User is not a member of this company");
    this.name = "UserNotInCompanyError";
  }
}

export { UserNotInCompanyError };
