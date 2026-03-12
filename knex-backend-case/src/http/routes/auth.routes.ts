import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { LoginUserService } from "../../application/services/LoginUserService.js";
import { RegisterUserService } from "../../application/services/RegisterUserService.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";

const authRouter = Router();

const userRepository = new PrismaUserRepository();
const registerService = new RegisterUserService(userRepository);
const loginService = new LoginUserService(userRepository);
const authController = new AuthController(registerService, loginService);

authRouter.post("/auth/register", (req, res) => authController.register(req, res));
authRouter.post("/auth/login", (req, res) => authController.login(req, res));

export { authRouter };
