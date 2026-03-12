import { UUID } from "crypto";
import { Transaction } from "../entities/transaction.js";

type TransactionWithProduct = {
  transaction: Transaction;
  product: { id: string; name: string; company: { id: string; name: string } };
};

type TransactionWithBuyerAndProduct = {
  transaction: Transaction;
  buyer: { id: string; name: string };
  product: { id: string; name: string };
};

type ListUserTransactionsParams = {
  page: number;
  limit: number;
};

type ListCompanyTransactionsParams = {
  page: number;
  limit: number;
  productId?: string;
};

interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findByUserId(userId: UUID, params: ListUserTransactionsParams): Promise<{ items: TransactionWithProduct[]; total: number }>;
  findByCompanyId(companyId: UUID, params: ListCompanyTransactionsParams): Promise<{ items: TransactionWithBuyerAndProduct[]; total: number }>;
}

export { ITransactionRepository, TransactionWithProduct, TransactionWithBuyerAndProduct, ListUserTransactionsParams, ListCompanyTransactionsParams };
