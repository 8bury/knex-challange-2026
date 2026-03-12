import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { GetUserProfileService } from "../../application/services/GetUserProfileService.js";
import { LoginUserService } from "../../application/services/LoginUserService.js";
import { RegisterUserService } from "../../application/services/RegisterUserService.js";
import { PrismaCompanyRepository } from "../../infrastructure/repositories/PrismaCompanyRepository.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

const userRepository = new PrismaUserRepository();
const companyRepository = new PrismaCompanyRepository();
const registerService = new RegisterUserService(userRepository);
const loginService = new LoginUserService(userRepository);
const getProfileService = new GetUserProfileService(userRepository, companyRepository);
const authController = new AuthController(registerService, loginService, getProfileService);

authRouter.post("/auth/register", (req, res) => authController.register(req, res));
authRouter.post("/auth/login", (req, res) => authController.login(req, res));
authRouter.get("/auth/profile", authMiddleware, (req, res) => authController.getProfile(req, res));

export { authRouter };
