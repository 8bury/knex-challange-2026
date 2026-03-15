import { Request, Response } from "express";
import { z } from "zod";
import { CreateTransactionService } from "../../application/services/CreateTransactionService.js";
import { ListCompanyTransactionsService } from "../../application/services/ListCompanyTransactionsService.js";
import { ListUserTransactionsService } from "../../application/services/ListUserTransactionsService.js";

const uuidSchema = z.string().uuid("Invalid ID format");

const createTransactionSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

class TransactionController {
  constructor(
    private readonly createService: CreateTransactionService,
    private readonly listUserService: ListUserTransactionsService,
    private readonly listCompanyService: ListCompanyTransactionsService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const body = createTransactionSchema.parse(req.body);
    const result = await this.createService.execute(req.userId!, body);
    res.status(201).json(result);
  }

  async listByUser(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await this.listUserService.execute(req.userId!, page, limit);
    res.status(200).json(result);
  }

  async listByCompany(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const productId = typeof req.query.productId === "string" ? req.query.productId : undefined;
    const result = await this.listCompanyService.execute(req.userId!, id, page, limit, productId);
    res.status(200).json(result);
  }
}

export { TransactionController };
