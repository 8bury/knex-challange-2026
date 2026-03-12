import { UUID } from "crypto";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { UserNotInCompanyError } from "../../domain/errors/UserNotInCompanyError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";

class LeaveCompanyService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string, companyId: string): Promise<void> {
    const company = await this.companyRepository.findById(companyId as UUID);
    if (!company) throw new CompanyNotFoundError();

    const user = await this.userRepository.findById(userId as UUID);
    if (!user) throw new Error("User not found");

    if (user.companyId !== company.id) throw new UserNotInCompanyError();

    user.unlinkFromCompany();
    await this.userRepository.save(user);
  }
}

export { LeaveCompanyService };
