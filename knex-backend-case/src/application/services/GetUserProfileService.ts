import { UUID } from "crypto";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { ProfileOutput } from "../dtos/profile.dto.js";

class GetUserProfileService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string): Promise<ProfileOutput | null> {
    const user = await this.userRepository.findById(userId as UUID);
    if (!user) return null;

    let company = null;
    if (user.companyId) {
      const found = await this.companyRepository.findById(user.companyId);
      if (found) company = { id: found.id, name: found.name };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      company,
    };
  }
}

export { GetUserProfileService };
