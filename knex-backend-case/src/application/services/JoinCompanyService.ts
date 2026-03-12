import { UUID } from "crypto";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { UserAlreadyInCompanyError } from "../../domain/errors/UserAlreadyInCompanyError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { JoinCompanyOutput } from "../dtos/company.dto.js";

class JoinCompanyService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string, companyId: string): Promise<JoinCompanyOutput> {
    const company = await this.companyRepository.findById(companyId as UUID);
    if (!company) throw new CompanyNotFoundError();

    const user = await this.userRepository.findById(userId as UUID);
    if (!user) throw new Error("User not found");

    if (user.isCollaborator()) throw new UserAlreadyInCompanyError();

    user.linkToCompany(company.id);
    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      company: { id: company.id, name: company.name },
    };
  }
}

export { JoinCompanyService };
