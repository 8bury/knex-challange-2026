import { UUID } from "crypto";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { NotCompanyMemberError } from "../../domain/errors/NotCompanyMemberError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { CompanyTransactionListItem, TransactionListOutput } from "../dtos/transaction.dto.js";

class ListCompanyTransactionsService {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly companyRepository: ICompanyRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    requestingUserId: string,
    companyId: string,
    page = 1,
    limit = 20,
    productId?: string,
  ): Promise<TransactionListOutput<CompanyTransactionListItem>> {
    const company = await this.companyRepository.findById(companyId as UUID);
    if (!company) throw new CompanyNotFoundError();

    const user = await this.userRepository.findById(requestingUserId as UUID);
    if (!user || user.companyId !== company.id) throw new NotCompanyMemberError();

    const { items, total } = await this.transactionRepository.findByCompanyId(company.id, { page, limit, productId });

    return {
      data: items.map(({ transaction: t, buyer, product }) => ({
        id: t.id,
        quantity: t.quantity,
        unitPrice: t.unitPrice,
        createdAt: t.createdAt,
        buyer,
        product,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}

export { ListCompanyTransactionsService };
