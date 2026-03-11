import { randomUUID, UUID } from "crypto";

enum UserCompanyRole {
  MEMBER = 'member',
}

class UserCompany {
  private constructor(
    public readonly id: UUID,
    public userId: UUID,
    public companyId: UUID,
    public role: UserCompanyRole,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) { }

  static criar(userId: UUID, companyId: UUID, role: UserCompanyRole): UserCompany {
    return new UserCompany(randomUUID(), userId, companyId, role, new Date(), new Date());
  }

  static carregar(
    id: UUID,
    userId: UUID,
    companyId: UUID,
    role: UserCompanyRole,
    createdAt: Date,
    updatedAt: Date,
  ): UserCompany {
    return new UserCompany(id, userId, companyId, role, createdAt, updatedAt);
  }

  changeRole(role: UserCompanyRole) {
    this.role = role;
    this.updatedAt = new Date();
  }
}

export { UserCompany, UserCompanyRole };
