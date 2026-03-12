import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/user.js";
import { DuplicateEmailError } from "../../domain/errors/DuplicateEmailError.js";
import { InvalidFieldError } from "../../domain/errors/InvalidFieldError.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { RegisterInput, RegisterOutput } from "../dtos/auth.dto.js";

const MIN_PASSWORD_LENGTH = 6;

class RegisterUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const { name, email, password } = input;

    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      throw new InvalidFieldError("password", `must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new DuplicateEmailError();
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = User.criar(name, email, passwordHash);

    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}

export { RegisterUserService };
