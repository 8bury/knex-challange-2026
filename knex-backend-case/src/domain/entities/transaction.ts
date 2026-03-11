import { UUID } from "crypto";

class Transaction {
  public readonly totalPrice: number;

  constructor(
    public readonly id: UUID,
    public readonly userId: UUID,
    public readonly productId: UUID,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly createdAt: Date,
  ) {
    if (quantity <= 0) throw new Error("Quantity must be greater than zero");
    if (unitPrice <= 0) throw new Error("Unit price must be greater than zero");
    this.totalPrice = quantity * unitPrice;
  }
}