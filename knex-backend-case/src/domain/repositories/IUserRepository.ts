import { UUID } from "crypto";
import { User } from "../entities/user.js";

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: UUID): Promise<User | null>;
  save(user: User): Promise<void>;
}

export { IUserRepository };
