import { UUID } from "crypto";
import { Transaction } from "../../domain/entities/transaction.js";
import {
  AtomicPurchaseData,
  ITransactionRepository,
  ListCompanyTransactionsParams,
  ListUserTransactionsParams,
  TransactionWithBuyerAndProduct,
  TransactionWithProduct,
} from "../../domain/repositories/ITransactionRepository.js";
import { InsufficientStockError } from "../../domain/errors/InsufficientStockError.js";
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

  async atomicPurchase(productId: UUID, quantity: number, data: AtomicPurchaseData): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const result = await tx.product.updateMany({
        where: { id: productId, stock: { gte: quantity }, deletedAt: null },
        data: { stock: { decrement: quantity }, updatedAt: new Date() },
      });

      if (result.count === 0) throw new InsufficientStockError();

      await tx.transaction.create({
        data: {
          id: data.id,
          userId: data.userId,
          productId,
          quantity,
          unitPrice: data.unitPrice,
          createdAt: data.createdAt,
        },
      });
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

    type TxWithProductRecord = Parameters<typeof toTransaction>[0] & { product: { id: string; name: string; company: { id: string; name: string } } };
    const items: TransactionWithProduct[] = records.map((r: TxWithProductRecord) => ({
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

    type TxWithBuyerRecord = Parameters<typeof toTransaction>[0] & { user: { id: string; name: string }; product: { id: string; name: string } };
    const items: TransactionWithBuyerAndProduct[] = records.map((r: TxWithBuyerRecord) => ({
      transaction: toTransaction(r),
      buyer: { id: r.user.id, name: r.user.name },
      product: { id: r.product.id, name: r.product.name },
    }));
    return { items, total };
  }
}

export { PrismaTransactionRepository };
