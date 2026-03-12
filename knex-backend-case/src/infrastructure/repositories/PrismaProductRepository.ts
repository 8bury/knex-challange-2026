import { UUID } from "crypto";
import { Product } from "../../domain/entities/product.js";
import { IProductRepository, ListProductsParams, ProductWithCompany } from "../../domain/repositories/IProductRepository.js";
import { prisma } from "../prisma/client.js";

function toProduct(r: { id: string; name: string; description: string; price: { toNumber(): number }; stock: number; companyId: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null }): Product {
  return Product.carregar(r.id as UUID, r.name, r.description, r.price.toNumber(), r.stock, r.companyId as UUID, r.createdAt, r.updatedAt, r.deletedAt);
}

class PrismaProductRepository implements IProductRepository {
  async findById(id: UUID): Promise<Product | null> {
    const r = await prisma.product.findUnique({ where: { id, deletedAt: null } });
    if (!r) return null;
    return toProduct(r);
  }

  async findByIdWithCompany(id: UUID): Promise<ProductWithCompany | null> {
    const r = await prisma.product.findUnique({ where: { id, deletedAt: null }, include: { company: true } });
    if (!r) return null;
    return { product: toProduct(r), company: { id: r.company.id, name: r.company.name } };
  }

  async findAll({ page, limit, search, companyId, minPrice, maxPrice }: ListProductsParams): Promise<{ items: ProductWithCompany[]; total: number }> {
    const where = {
      deletedAt: null,
      ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {}),
      ...(companyId ? { companyId } : {}),
      ...((minPrice !== undefined || maxPrice !== undefined) ? {
        price: {
          ...(minPrice !== undefined ? { gte: minPrice } : {}),
          ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
        },
      } : {}),
    };

    const [records, total] = await Promise.all([
      prisma.product.findMany({ where, include: { company: true }, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.product.count({ where }),
    ]);

    const items = records.map((r) => ({ product: toProduct(r), company: { id: r.company.id, name: r.company.name } }));
    return { items, total };
  }

  async save(product: Product): Promise<void> {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
      },
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        companyId: product.companyId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
      },
    });
  }

  async softDelete(id: UUID): Promise<void> {
    await prisma.product.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

export { PrismaProductRepository };
