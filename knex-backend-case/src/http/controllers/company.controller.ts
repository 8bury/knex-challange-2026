import { Request, Response } from "express";
import { z } from "zod";
import { CreateCompanyService } from "../../application/services/CreateCompanyService.js";
import { DeleteCompanyService } from "../../application/services/DeleteCompanyService.js";
import { GetCompanyDetailsService } from "../../application/services/GetCompanyDetailsService.js";
import { JoinCompanyService } from "../../application/services/JoinCompanyService.js";
import { LeaveCompanyService } from "../../application/services/LeaveCompanyService.js";
import { ListCompaniesService } from "../../application/services/ListCompaniesService.js";
import { ListCompanyMembersService } from "../../application/services/ListCompanyMembersService.js";

const uuidSchema = z.string().uuid("Invalid ID format");

const createCompanySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

class CompanyController {
  constructor(
    private readonly createService: CreateCompanyService,
    private readonly listService: ListCompaniesService,
    private readonly detailsService: GetCompanyDetailsService,
    private readonly deleteService: DeleteCompanyService,
    private readonly joinService: JoinCompanyService,
    private readonly leaveService: LeaveCompanyService,
    private readonly listMembersService: ListCompanyMembersService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const body = createCompanySchema.parse(req.body);
    const result = await this.createService.execute(body);
    res.status(201).json(result);
  }

  async list(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const result = await this.listService.execute({ page, limit, search });
    res.status(200).json(result);
  }

  async getDetails(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    const result = await this.detailsService.execute(id);
    res.status(200).json(result);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    await this.deleteService.execute(id);
    res.status(204).send();
  }

  async join(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    const result = await this.joinService.execute(req.userId!, id);
    res.status(200).json(result);
  }

  async leave(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    await this.leaveService.execute(req.userId!, id);
    res.status(204).send();
  }

  async listMembers(req: Request, res: Response): Promise<void> {
    const id = uuidSchema.parse(req.params.id);
    const result = await this.listMembersService.execute(id);
    res.status(200).json(result);
  }
}

export { CompanyController };
