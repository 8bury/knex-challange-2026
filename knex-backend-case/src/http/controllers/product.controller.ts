import { Request, Response } from "express";
import { InvalidFieldError } from "../../domain/errors/InvalidFieldError.js";
import { NotCompanyMemberError } from "../../domain/errors/NotCompanyMemberError.js";
import { ProductNotFoundError } from "../../domain/errors/ProductNotFoundError.js";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { CreateProductService } from "../../application/services/CreateProductService.js";
import { DeleteProductService } from "../../application/services/DeleteProductService.js";
import { GetProductDetailsService } from "../../application/services/GetProductDetailsService.js";
import { ListProductsService } from "../../application/services/ListProductsService.js";
import { UpdateProductService } from "../../application/services/UpdateProductService.js";

class ProductController {
  constructor(
    private readonly createService: CreateProductService,
    private readonly listService: ListProductsService,
    private readonly detailsService: GetProductDetailsService,
    private readonly updateService: UpdateProductService,
    private readonly deleteService: DeleteProductService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.createService.execute(req.userId!, req.params["companyId"] as string, req.body);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof InvalidFieldError) { res.status(422).json({ error: err.message }); return; }
      if (err instanceof CompanyNotFoundError) { res.status(404).json({ error: err.message }); return; }
      if (err instanceof NotCompanyMemberError) { res.status(403).json({ error: err.message }); return; }
      throw err;
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const companyId = typeof req.query.companyId === "string" ? req.query.companyId : undefined;
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

    const result = await this.listService.execute({ page, limit, search, companyId, minPrice, maxPrice });
    res.status(200).json(result);
  }

  async getDetails(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.detailsService.execute(req.params["id"] as string);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof ProductNotFoundError) { res.status(404).json({ error: err.message }); return; }
      throw err;
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.updateService.execute(req.userId!, req.params["id"] as string, req.body);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof InvalidFieldError) { res.status(422).json({ error: err.message }); return; }
      if (err instanceof ProductNotFoundError) { res.status(404).json({ error: err.message }); return; }
      if (err instanceof NotCompanyMemberError) { res.status(403).json({ error: err.message }); return; }
      throw err;
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.deleteService.execute(req.userId!, req.params["id"] as string);
      res.status(204).send();
    } catch (err) {
      if (err instanceof ProductNotFoundError) { res.status(404).json({ error: err.message }); return; }
      if (err instanceof NotCompanyMemberError) { res.status(403).json({ error: err.message }); return; }
      throw err;
    }
  }
}

export { ProductController };
