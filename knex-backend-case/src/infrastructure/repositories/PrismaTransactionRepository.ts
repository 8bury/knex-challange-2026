import { UUID } from "crypto";
import { Transaction } from "../../domain/entities/transaction.js";
import {
  ITransactionRepository,
  ListCompanyTransactionsParams,
  ListUserTransactionsParams,
  TransactionWithBuyerAndProduct,
  TransactionWithProduct,
} from "../../domain/repositories/ITransactionRepository.js";
import { prisma } from "../prisma/client.js";

function toTransaction(r: { id: string; userId: string; productId: string; quantity: number; unitPrice: { toNumber(): number }; createdAt: Date }): Transaction {
  return Transaction.carregar(r.id as UUID, r.userId as UUID, r.productId as UUID, r.quantity, r.unitPrice.toNumber(), r.createdAt);
}

class PrismaTransactionRepository implements ITransactionRepository {
  async save(transaction: Transaction): Promise<void> {
    await prisma.transaction.create({
      data: {
        id: transaction.id,
        userId: transaction.userId,
        productId: transaction.productId,
        quantity: transaction.quantity,
        unitPrice: transaction.unitPrice,
        createdAt: transaction.createdAt,
      },
    });
  }

  async findByUserId(userId: UUID, { page, limit }: ListUserTransactionsParams): Promise<{ items: TransactionWithProduct[]; total: number }> {
    const where = { userId };
    const [records, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: { product: { include: { company: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.transaction.count({ where }),
    ]);

    const items: TransactionWithProduct[] = records.map((r) => ({
      transaction: toTransaction(r),
      product: { id: r.product.id, name: r.product.name, company: { id: r.product.company.id, name: r.product.company.name } },
    }));
    return { items, total };
  }

  async findByCompanyId(companyId: UUID, { page, limit, productId }: ListCompanyTransactionsParams): Promise<{ items: TransactionWithBuyerAndProduct[]; total: number }> {
    const where = {
      product: { companyId },
      ...(productId ? { productId } : {}),
    };
    const [records, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: { user: true, product: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.transaction.count({ where }),
    ]);

    const items: TransactionWithBuyerAndProduct[] = records.map((r) => ({
      transaction: toTransaction(r),
      buyer: { id: r.user.id, name: r.user.name },
      product: { id: r.product.id, name: r.product.name },
    }));
    return { items, total };
  }
}

export { PrismaTransactionRepository };
