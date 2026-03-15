import { UUID } from "crypto";
import { User } from "../../domain/entities/user.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { prisma } from "../prisma/client.js";

class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email } });
    if (!record) return null;
    return User.carregar(
      record.id as UUID,
      record.name,
      record.email,
      record.passwordHash,
      record.companyId as UUID | null,
      record.createdAt,
      record.updatedAt,
      record.active,
    );
  }

  async findById(id: UUID): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } });
    if (!record) return null;
    return User.carregar(
      record.id as UUID,
      record.name,
      record.email,
      record.passwordHash,
      record.companyId as UUID | null,
      record.createdAt,
      record.updatedAt,
      record.active,
    );
  }

  async findCompanyId(id: UUID): Promise<UUID | null> {
    const record = await prisma.user.findUnique({ where: { id }, select: { companyId: true } });
    return (record?.companyId as UUID | null) ?? null;
  }

  async findByCompanyId(companyId: UUID): Promise<User[]> {
    const records = await prisma.user.findMany({ where: { companyId } });
    return records.map((r: { id: string; name: string; email: string; passwordHash: string; companyId: string | null; createdAt: Date; updatedAt: Date; active: boolean }) =>
      User.carregar(r.id as UUID, r.name, r.email, r.passwordHash, r.companyId as UUID | null, r.createdAt, r.updatedAt, r.active),
    );
  }

  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
        passwordHash: user.getPasswordHash(),
        companyId: user.companyId,
        active: user.active,
        updatedAt: user.updatedAt,
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.getPasswordHash(),
        companyId: user.companyId,
        active: user.active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }
}

export { PrismaUserRepository };
