import { Company } from "../../domain/entities/company.js";
import { DuplicateCompanyNameError } from "../../domain/errors/DuplicateCompanyNameError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { CreateCompanyInput, CompanyOutput } from "../dtos/company.dto.js";

class CreateCompanyService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(input: CreateCompanyInput): Promise<CompanyOutput> {
    const existing = await this.companyRepository.findByName(input.name);
    if (existing) throw new DuplicateCompanyNameError();

    const company = Company.criar(input.name);
    await this.companyRepository.save(company);

    return { id: company.id, name: company.name, createdAt: company.createdAt, updatedAt: company.updatedAt };
  }
}

export { CreateCompanyService };
