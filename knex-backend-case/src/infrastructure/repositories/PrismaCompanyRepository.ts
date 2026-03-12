import { UUID } from "crypto";
import { Company } from "../../domain/entities/company.js";
import { ICompanyRepository, ListCompaniesParams, ListCompaniesResult } from "../../domain/repositories/ICompanyRepository.js";
import { prisma } from "../prisma/client.js";

class PrismaCompanyRepository implements ICompanyRepository {
  async findById(id: UUID): Promise<Company | null> {
    const record = await prisma.company.findUnique({ where: { id } });
    if (!record) return null;
    return Company.carregar(record.id as UUID, record.name, record.createdAt, record.updatedAt);
  }

  async findByName(name: string): Promise<Company | null> {
    const record = await prisma.company.findFirst({ where: { name: { equals: name, mode: "insensitive" } } });
    if (!record) return null;
    return Company.carregar(record.id as UUID, record.name, record.createdAt, record.updatedAt);
  }

  async save(company: Company): Promise<void> {
    await prisma.company.upsert({
      where: { id: company.id },
      update: { name: company.name, updatedAt: company.updatedAt },
      create: { id: company.id, name: company.name, createdAt: company.createdAt, updatedAt: company.updatedAt },
    });
  }

  async findAll({ page, limit, search }: ListCompaniesParams): Promise<ListCompaniesResult> {
    const where = search ? { name: { contains: search, mode: "insensitive" as const } } : {};
    const [records, total] = await Promise.all([
      prisma.company.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.company.count({ where }),
    ]);
    const companies = records.map((r) => Company.carregar(r.id as UUID, r.name, r.createdAt, r.updatedAt));
    return { companies, total };
  }

  async countMembers(companyId: UUID): Promise<number> {
    return prisma.user.count({ where: { companyId } });
  }

  async countProducts(companyId: UUID): Promise<number> {
    return prisma.product.count({ where: { companyId } });
  }

  async delete(id: UUID): Promise<void> {
    await prisma.company.delete({ where: { id } });
  }
}

export { PrismaCompanyRepository };
