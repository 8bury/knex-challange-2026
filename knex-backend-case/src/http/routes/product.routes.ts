import { Router } from "express";
import { CreateProductService } from "../../application/services/CreateProductService.js";
import { DeleteProductService } from "../../application/services/DeleteProductService.js";
import { GetProductDetailsService } from "../../application/services/GetProductDetailsService.js";
import { ListProductsService } from "../../application/services/ListProductsService.js";
import { UpdateProductService } from "../../application/services/UpdateProductService.js";
import { PrismaCompanyRepository } from "../../infrastructure/repositories/PrismaCompanyRepository.js";
import { PrismaProductRepository } from "../../infrastructure/repositories/PrismaProductRepository.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ProductController } from "../controllers/product.controller.js";

const productRouter = Router();

const productRepository = new PrismaProductRepository();
const companyRepository = new PrismaCompanyRepository();
const userRepository = new PrismaUserRepository();

const productController = new ProductController(
  new CreateProductService(productRepository, companyRepository, userRepository),
  new ListProductsService(productRepository),
  new GetProductDetailsService(productRepository),
  new UpdateProductService(productRepository, userRepository),
  new DeleteProductService(productRepository, userRepository),
);

productRouter.use(authMiddleware);

productRouter.post("/companies/:companyId/products", (req, res) => productController.create(req, res));
productRouter.get("/products", (req, res) => productController.list(req, res));
productRouter.get("/products/:id", (req, res) => productController.getDetails(req, res));
productRouter.put("/products/:id", (req, res) => productController.update(req, res));
productRouter.delete("/products/:id", (req, res) => productController.delete(req, res));

export { productRouter };
