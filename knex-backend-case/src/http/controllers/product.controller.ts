import { Request, Response } from "express";
import { z } from "zod";
import { CreateProductService } from "../../application/services/CreateProductService.js";
import { DeleteProductService } from "../../application/services/DeleteProductService.js";
import { GetProductDetailsService } from "../../application/services/GetProductDetailsService.js";
import { ListProductsService } from "../../application/services/ListProductsService.js";
import { UpdateProductService } from "../../application/services/UpdateProductService.js";

const uuidSchema = z.string().uuid("Invalid ID format");

const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than zero"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional(),
});

class ProductController {
  constructor(
    private readonly createService: CreateProductService,
    private readonly listService: ListProductsService,
    private readonly detailsService: GetProductDetailsService,
    private readonly updateService: UpdateProductService,
    private readonly deleteService: DeleteProductService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const companyId = uuidSchema.parse(req.params.companyId);
    const body = createProductSchema.parse(req.body);
    const result = await this.createService.execute(req.userId!, companyId, body);
    res.status(201).json(result);
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
    const id = uuidSchema.parse(req.params.id);
    const result = await this.detailsService.execute(id);
    res.status(200).json(result);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    const body = updateProductSchema.parse(req.body);
    const result = await this.updateService.execute(req.userId!, id, body);
    res.status(200).json(result);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    await this.deleteService.execute(req.userId!, id);
    res.status(204).send();
  }
}

export { ProductController };
