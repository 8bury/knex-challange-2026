type CreateTransactionInput = {
  productId: string;
  quantity: number;
}

type TransactionOutput = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: Date;
}

export { CreateTransactionInput, TransactionOutput };
