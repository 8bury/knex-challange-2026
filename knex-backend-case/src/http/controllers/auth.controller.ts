import { Request, Response } from "express";
import { z } from "zod";
import { GetUserProfileService } from "../../application/services/GetUserProfileService.js";
import { LoginUserService } from "../../application/services/LoginUserService.js";
import { RegisterUserService } from "../../application/services/RegisterUserService.js";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

class AuthController {
  constructor(
    private readonly registerService: RegisterUserService,
    private readonly loginService: LoginUserService,
    private readonly getProfileService: GetUserProfileService,
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    const body = registerSchema.parse(req.body);
    const result = await this.registerService.execute(body);
    res.status(201).json(result);
  }

  async login(req: Request, res: Response): Promise<void> {
    const body = loginSchema.parse(req.body);
    const result = await this.loginService.execute(body);
    res.status(200).json(result);
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    const profile = await this.getProfileService.execute(req.userId!);
    if (!profile) {
      res.status(401).json({ error: "Missing or invalid token" });
      return;
    }
    res.status(200).json(profile);
  }
}

export { AuthController };
