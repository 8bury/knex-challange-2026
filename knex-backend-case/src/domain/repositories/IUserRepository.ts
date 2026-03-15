import { UUID } from "crypto";
import { User } from "../entities/user.js";

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: UUID): Promise<User | null>;
  findCompanyId(id: UUID): Promise<UUID | null>;
  findByCompanyId(companyId: UUID): Promise<User[]>;
  save(user: User): Promise<void>;
}

export { IUserRepository };
