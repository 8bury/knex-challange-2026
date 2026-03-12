import { Router } from "express";
import { CreateCompanyService } from "../../application/services/CreateCompanyService.js";
import { DeleteCompanyService } from "../../application/services/DeleteCompanyService.js";
import { GetCompanyDetailsService } from "../../application/services/GetCompanyDetailsService.js";
import { ListCompaniesService } from "../../application/services/ListCompaniesService.js";
import { PrismaCompanyRepository } from "../../infrastructure/repositories/PrismaCompanyRepository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { CompanyController } from "../controllers/company.controller.js";

const companyRouter = Router();

const companyRepository = new PrismaCompanyRepository();
const companyController = new CompanyController(
  new CreateCompanyService(companyRepository),
  new ListCompaniesService(companyRepository),
  new GetCompanyDetailsService(companyRepository),
  new DeleteCompanyService(companyRepository),
);

companyRouter.use(authMiddleware);

companyRouter.post("/companies", (req, res) => companyController.create(req, res));
companyRouter.get("/companies", (req, res) => companyController.list(req, res));
companyRouter.get("/companies/:id", (req, res) => companyController.getDetails(req, res));
companyRouter.delete("/companies/:id", (req, res) => companyController.delete(req, res));

export { companyRouter };
