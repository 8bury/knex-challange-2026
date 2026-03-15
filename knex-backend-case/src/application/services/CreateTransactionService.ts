import { UUID } from "crypto";
import { Transaction } from "../../domain/entities/transaction.js";
import { InsufficientStockError } from "../../domain/errors/InsufficientStockError.js";
import { InvalidFieldError } from "../../domain/errors/InvalidFieldError.js";
import { ProductNotFoundError } from "../../domain/errors/ProductNotFoundError.js";
import { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository.js";
import { CreateTransactionInput, TransactionOutput } from "../dtos/transaction.dto.js";

class CreateTransactionService {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(userId: string, input: CreateTransactionInput): Promise<TransactionOutput> {
    if (!input.quantity || input.quantity <= 0) {
      throw new InvalidFieldError("quantity", "must be greater than zero");
    }

    const product = await this.productRepository.findById(input.productId as UUID);
    if (!product) throw new ProductNotFoundError();

    if (product.stock < input.quantity) throw new InsufficientStockError();

    const transaction = Transaction.criar(userId as UUID, product.id, input.quantity, product.price);

    await this.transactionRepository.atomicPurchase(product.id, input.quantity, {
      id: transaction.id,
      userId: transaction.userId,
      unitPrice: transaction.unitPrice,
      createdAt: transaction.createdAt,
    });

    return {
      id: transaction.id,
      userId: transaction.userId,
      productId: transaction.productId,
      quantity: transaction.quantity,
      unitPrice: transaction.unitPrice,
      totalPrice: transaction.totalPrice,
      createdAt: transaction.createdAt,
    };
  }
}

export { CreateTransactionService };
