class UserNotInCompanyError extends Error {
  constructor() {
    super("User is not a member of this company");
    this.name = "UserNotInCompanyError";
  }
}

export { UserNotInCompanyError };
