import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentialsError.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { LoginInput, LoginOutput } from "../dtos/auth.dto.js";

class LoginUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await bcrypt.compare(password, user.getPasswordHash());
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not configured");

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d" });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { LoginUserService };
