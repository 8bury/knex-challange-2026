class NotCompanyMemberError extends Error {
  constructor() {
    super("User is not a member of this company");
    this.name = "NotCompanyMemberError";
  }
}

export { NotCompanyMemberError };
