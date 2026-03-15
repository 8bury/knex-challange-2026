class NotCompanyMemberError extends Error {
  readonly statusCode = 403;
  constructor() {
    super("User is not a member of this company");
    this.name = "NotCompanyMemberError";
  }
}

export { NotCompanyMemberError };
