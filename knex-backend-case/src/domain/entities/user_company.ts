import { UUID } from "crypto";

enum UserCompanyRole {
  MEMBER = 'member',
}

class UserCompany {
  constructor(
    public readonly id: UUID,
    public userId: UUID,
    public companyId: UUID,
    public role: UserCompanyRole,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) { }
  
  changeRole(role: UserCompanyRole) {
    this.role = role;
    this.updatedAt = new Date();
  }
}