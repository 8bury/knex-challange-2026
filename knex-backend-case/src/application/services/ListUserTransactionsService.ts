import { UUID } from "crypto";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository.js";
import { TransactionListOutput, UserTransactionListItem } from "../dtos/transaction.dto.js";

class ListUserTransactionsService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(userId: string, page = 1, limit = 20): Promise<TransactionListOutput<UserTransactionListItem>> {
    const { items, total } = await this.transactionRepository.findByUserId(userId as UUID, { page, limit });

    return {
      data: items.map(({ transaction: t, product }) => ({
        id: t.id,
        quantity: t.quantity,
        unitPrice: t.unitPrice,
        totalPrice: t.totalPrice,
        createdAt: t.createdAt,
        product,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}

export { ListUserTransactionsService };
