import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { CompanyListOutput } from "../dtos/company.dto.js";

type ListCompaniesInput = {
  page?: number;
  limit?: number;
  search?: string;
};

class ListCompaniesService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async execute(input: ListCompaniesInput): Promise<CompanyListOutput> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const { companies, total } = await this.companyRepository.findAll({ page, limit, search: input.search });

    return {
      data: companies.map((c) => ({ id: c.id, name: c.name, createdAt: c.createdAt })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export { ListCompaniesService };
