import { Router } from "express";
import { CreateCompanyService } from "../../application/services/CreateCompanyService.js";
import { DeleteCompanyService } from "../../application/services/DeleteCompanyService.js";
import { GetCompanyDetailsService } from "../../application/services/GetCompanyDetailsService.js";
import { JoinCompanyService } from "../../application/services/JoinCompanyService.js";
import { LeaveCompanyService } from "../../application/services/LeaveCompanyService.js";
import { ListCompaniesService } from "../../application/services/ListCompaniesService.js";
import { ListCompanyMembersService } from "../../application/services/ListCompanyMembersService.js";
import { PrismaCompanyRepository } from "../../infrastructure/repositories/PrismaCompanyRepository.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { CompanyController } from "../controllers/company.controller.js";

const companyRouter = Router();

const companyRepository = new PrismaCompanyRepository();
const userRepository = new PrismaUserRepository();
const companyController = new CompanyController(
  new CreateCompanyService(companyRepository),
  new ListCompaniesService(companyRepository),
  new GetCompanyDetailsService(companyRepository),
  new DeleteCompanyService(companyRepository),
  new JoinCompanyService(userRepository, companyRepository),
  new LeaveCompanyService(userRepository, companyRepository),
  new ListCompanyMembersService(userRepository, companyRepository),
);

companyRouter.use(authMiddleware);

companyRouter.post("/companies", (req, res) => companyController.create(req, res));
companyRouter.get("/companies", (req, res) => companyController.list(req, res));
companyRouter.get("/companies/:id", (req, res) => companyController.getDetails(req, res));
companyRouter.delete("/companies/:id", (req, res) => companyController.delete(req, res));
companyRouter.post("/companies/:id/join", (req, res) => companyController.join(req, res));
companyRouter.post("/companies/:id/leave", (req, res) => companyController.leave(req, res));
companyRouter.get("/companies/:id/members", (req, res) => companyController.listMembers(req, res));

export { companyRouter };
