import { UUID } from "crypto";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { CompanyMembersOutput } from "../dtos/company.dto.js";

class ListCompanyMembersService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(companyId: string): Promise<CompanyMembersOutput> {
    const company = await this.companyRepository.findById(companyId as UUID);
    if (!company) throw new CompanyNotFoundError();

    const members = await this.userRepository.findByCompanyId(company.id);

    return {
      data: members.map((u) => ({ id: u.id, name: u.name, email: u.email })),
    };
  }
}

export { ListCompanyMembersService };
