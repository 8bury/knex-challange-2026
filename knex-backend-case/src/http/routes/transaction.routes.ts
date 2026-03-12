import { Router } from "express";
import { CreateTransactionService } from "../../application/services/CreateTransactionService.js";
import { ListCompanyTransactionsService } from "../../application/services/ListCompanyTransactionsService.js";
import { ListUserTransactionsService } from "../../application/services/ListUserTransactionsService.js";
import { PrismaCompanyRepository } from "../../infrastructure/repositories/PrismaCompanyRepository.js";
import { PrismaProductRepository } from "../../infrastructure/repositories/PrismaProductRepository.js";
import { PrismaTransactionRepository } from "../../infrastructure/repositories/PrismaTransactionRepository.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { TransactionController } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

const transactionRepository = new PrismaTransactionRepository();
const productRepository = new PrismaProductRepository();
const companyRepository = new PrismaCompanyRepository();
const userRepository = new PrismaUserRepository();

const transactionController = new TransactionController(
  new CreateTransactionService(transactionRepository, productRepository),
  new ListUserTransactionsService(transactionRepository),
  new ListCompanyTransactionsService(transactionRepository, companyRepository, userRepository),
);

transactionRouter.use(authMiddleware);

transactionRouter.post("/transactions", (req, res) => transactionController.create(req, res));
transactionRouter.get("/transactions", (req, res) => transactionController.listByUser(req, res));
transactionRouter.get("/companies/:id/transactions", (req, res) => transactionController.listByCompany(req, res));

export { transactionRouter };
