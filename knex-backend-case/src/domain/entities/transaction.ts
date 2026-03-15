import { randomUUID, UUID } from "crypto";
import { InvalidFieldError } from "../errors/InvalidFieldError.js";

class Transaction {
  private constructor(
    public readonly id: UUID,
    public readonly userId: UUID,
    public readonly productId: UUID,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly createdAt: Date,
  ) {
    if (quantity <= 0) throw new InvalidFieldError("quantity", "must be greater than zero");
    if (unitPrice <= 0) throw new InvalidFieldError("unitPrice", "must be greater than zero");
  }

  static criar(userId: UUID, productId: UUID, quantity: number, unitPrice: number): Transaction {
    return new Transaction(randomUUID(), userId, productId, quantity, unitPrice, new Date());
  }

  static carregar(
    id: UUID,
    userId: UUID,
    productId: UUID,
    quantity: number,
    unitPrice: number,
    createdAt: Date,
  ): Transaction {
    return new Transaction(id, userId, productId, quantity, unitPrice, createdAt);
  }
}

export { Transaction };
