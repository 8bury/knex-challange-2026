import { Request, Response } from "express";
import { CompanyHasAssociationsError } from "../../domain/errors/CompanyHasAssociationsError.js";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { DuplicateCompanyNameError } from "../../domain/errors/DuplicateCompanyNameError.js";
import { InvalidFieldError } from "../../domain/errors/InvalidFieldError.js";
import { CreateCompanyService } from "../../application/services/CreateCompanyService.js";
import { DeleteCompanyService } from "../../application/services/DeleteCompanyService.js";
import { GetCompanyDetailsService } from "../../application/services/GetCompanyDetailsService.js";
import { JoinCompanyService } from "../../application/services/JoinCompanyService.js";
import { LeaveCompanyService } from "../../application/services/LeaveCompanyService.js";
import { ListCompaniesService } from "../../application/services/ListCompaniesService.js";
import { ListCompanyMembersService } from "../../application/services/ListCompanyMembersService.js";
import { UserAlreadyInCompanyError } from "../../domain/errors/UserAlreadyInCompanyError.js";
import { UserNotInCompanyError } from "../../domain/errors/UserNotInCompanyError.js";

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
    try {
      const result = await this.createService.execute(req.body);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof InvalidFieldError) {
        res.status(422).json({ error: err.message });
        return;
      }
      if (err instanceof DuplicateCompanyNameError) {
        res.status(409).json({ error: err.message });
        return;
      }
      throw err;
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = typeof req.query.search === "string" ? req.query.search : undefined;

    const result = await this.listService.execute({ page, limit, search });
    res.status(200).json(result);
  }

  async getDetails(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.detailsService.execute(req.params["id"] as string);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof CompanyNotFoundError) {
        res.status(404).json({ error: err.message });
        return;
      }
      throw err;
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.deleteService.execute(req.params["id"] as string);
      res.status(204).send();
    } catch (err) {
      if (err instanceof CompanyNotFoundError) {
        res.status(404).json({ error: err.message });
        return;
      }
      if (err instanceof CompanyHasAssociationsError) {
        res.status(409).json({ error: err.message });
        return;
      }
      throw err;
    }
  }

  async join(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.joinService.execute(req.userId!, req.params["id"] as string);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof CompanyNotFoundError) {
        res.status(404).json({ error: err.message });
        return;
      }
      if (err instanceof UserAlreadyInCompanyError) {
        res.status(409).json({ error: err.message });
        return;
      }
      throw err;
    }
  }

  async leave(req: Request, res: Response): Promise<void> {
    try {
      await this.leaveService.execute(req.userId!, req.params["id"] as string);
      res.status(204).send();
    } catch (err) {
      if (err instanceof CompanyNotFoundError) {
        res.status(404).json({ error: err.message });
        return;
      }
      if (err instanceof UserNotInCompanyError) {
        res.status(409).json({ error: err.message });
        return;
      }
      throw err;
    }
  }

  async listMembers(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.listMembersService.execute(req.params["id"] as string);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof CompanyNotFoundError) {
        res.status(404).json({ error: err.message });
        return;
      }
      throw err;
    }
  }
}

export { CompanyController };
