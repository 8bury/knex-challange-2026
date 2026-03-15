type CreateTransactionInput = {
  productId: string;
  quantity: number;
};

type TransactionOutput = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  createdAt: Date;
};

type UserTransactionListItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    company: { id: string; name: string };
  };
};

type CompanyTransactionListItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  createdAt: Date;
  buyer: { id: string; name: string };
  product: { id: string; name: string };
};

type TransactionListOutput<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export { CreateTransactionInput, TransactionOutput, UserTransactionListItem, CompanyTransactionListItem, TransactionListOutput };
