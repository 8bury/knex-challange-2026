import { UUID } from "crypto";
import { Company } from "../entities/company.js";

type ListCompaniesParams = {
  page: number;
  limit: number;
  search?: string;
};

type ListCompaniesResult = {
  companies: Company[];
  total: number;
};

interface ICompanyRepository {
  findById(id: UUID): Promise<Company | null>;
  findByName(name: string): Promise<Company | null>;
  save(company: Company): Promise<void>;
  findAll(params: ListCompaniesParams): Promise<ListCompaniesResult>;
  countMembers(companyId: UUID): Promise<number>;
  countProducts(companyId: UUID): Promise<number>;
  delete(id: UUID): Promise<void>;
}

export { ICompanyRepository, ListCompaniesParams, ListCompaniesResult };
