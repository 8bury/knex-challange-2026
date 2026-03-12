import { UUID } from "crypto";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { CompanyDetailsOutput } from "../dtos/company.dto.js";

class GetCompanyDetailsService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<CompanyDetailsOutput> {
    const company = await this.companyRepository.findById(id as UUID);
    if (!company) throw new CompanyNotFoundError();

    const [membersCount, productsCount] = await Promise.all([
      this.companyRepository.countMembers(id as UUID),
      this.companyRepository.countProducts(id as UUID),
    ]);

    return {
      id: company.id,
      name: company.name,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
      membersCount,
      productsCount,
    };
  }
}

export { GetCompanyDetailsService };
