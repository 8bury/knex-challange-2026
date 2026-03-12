import { UUID } from "crypto";
import { Company } from "../../domain/entities/company.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { prisma } from "../prisma/client.js";

class PrismaCompanyRepository implements ICompanyRepository {
  async findById(id: UUID): Promise<Company | null> {
    const record = await prisma.company.findUnique({ where: { id } });
    if (!record) return null;
    return Company.carregar(record.id as UUID, record.name, record.createdAt, record.updatedAt);
  }
}

export { PrismaCompanyRepository };
