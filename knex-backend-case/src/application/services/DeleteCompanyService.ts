import { UUID } from "crypto";
import { CompanyHasAssociationsError } from "../../domain/errors/CompanyHasAssociationsError.js";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";

class DeleteCompanyService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id as UUID);
    if (!company) throw new CompanyNotFoundError();

    const [membersCount, productsCount] = await Promise.all([
      this.companyRepository.countMembers(id as UUID),
      this.companyRepository.countProducts(id as UUID),
    ]);

    if (membersCount > 0 || productsCount > 0) throw new CompanyHasAssociationsError();

    await this.companyRepository.delete(id as UUID);
  }
}

export { DeleteCompanyService };
