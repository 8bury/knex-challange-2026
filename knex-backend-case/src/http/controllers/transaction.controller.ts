import { Request, Response } from "express";
import { InsufficientStockError } from "../../domain/errors/InsufficientStockError.js";
import { InvalidFieldError } from "../../domain/errors/InvalidFieldError.js";
import { ProductNotFoundError } from "../../domain/errors/ProductNotFoundError.js";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { NotCompanyMemberError } from "../../domain/errors/NotCompanyMemberError.js";
import { CreateTransactionService } from "../../application/services/CreateTransactionService.js";
import { ListCompanyTransactionsService } from "../../application/services/ListCompanyTransactionsService.js";
import { ListUserTransactionsService } from "../../application/services/ListUserTransactionsService.js";

class TransactionController {
  constructor(
    private readonly createService: CreateTransactionService,
    private readonly listUserService: ListUserTransactionsService,
    private readonly listCompanyService: ListCompanyTransactionsService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.createService.execute(req.userId!, req.body);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof InvalidFieldError) { res.status(422).json({ error: err.message }); return; }
      if (err instanceof ProductNotFoundError) { res.status(404).json({ error: err.message }); return; }
      if (err instanceof InsufficientStockError) { res.status(409).json({ error: err.message }); return; }
      throw err;
    }
  }

  async listByUser(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await this.listUserService.execute(req.userId!, page, limit);
    res.status(200).json(result);
  }

  async listByCompany(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const productId = typeof req.query.productId === "string" ? req.query.productId : undefined;
      const result = await this.listCompanyService.execute(req.userId!, req.params["id"] as string, page, limit, productId);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof CompanyNotFoundError) { res.status(404).json({ error: err.message }); return; }
      if (err instanceof NotCompanyMemberError) { res.status(403).json({ error: err.message }); return; }
      throw err;
    }
  }
}

export { TransactionController };
