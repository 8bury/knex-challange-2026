import { Request, Response } from "express";
import { DuplicateEmailError } from "../../domain/errors/DuplicateEmailError.js";
import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentialsError.js";
import { InvalidFieldError } from "../../domain/errors/InvalidFieldError.js";
import { GetUserProfileService } from "../../application/services/GetUserProfileService.js";
import { LoginUserService } from "../../application/services/LoginUserService.js";
import { RegisterUserService } from "../../application/services/RegisterUserService.js";

class AuthController {
  constructor(
    private readonly registerService: RegisterUserService,
    private readonly loginService: LoginUserService,
    private readonly getProfileService: GetUserProfileService,
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.registerService.execute(req.body);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof InvalidFieldError) {
        res.status(422).json({ error: err.message });
        return;
      }
      if (err instanceof DuplicateEmailError) {
        res.status(409).json({ error: err.message });
        return;
      }
      throw err;
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.loginService.execute(req.body);
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        res.status(401).json({ error: err.message });
        return;
      }
      throw err;
    }
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
