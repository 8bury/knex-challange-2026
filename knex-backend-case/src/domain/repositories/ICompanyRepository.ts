import { UUID } from "crypto";
import { Company } from "../entities/company.js";

interface ICompanyRepository {
  findById(id: UUID): Promise<Company | null>;
}

export { ICompanyRepository };
