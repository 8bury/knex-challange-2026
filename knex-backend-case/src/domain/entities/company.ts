import { randomUUID, UUID } from "crypto";
import { InvalidFieldError } from "../errors/InvalidFieldError";

const MIN_NAME_LENGTH = 2;

class Company {
  private constructor(
    public readonly id: UUID,
    public name: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) { }

  static criar(name: string): Company {
    Company.validateName(name);
    return new Company(randomUUID(), name, new Date(), new Date());
  }

  static carregar(
    id: UUID,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ): Company {
    return new Company(id, name, createdAt, updatedAt);
  }

  private static validateName(name: string) {
    if (!name.trim()) throw new InvalidFieldError("name", "cannot be empty");
    if (name.trim().length < MIN_NAME_LENGTH) throw new InvalidFieldError("name", `must be at least ${MIN_NAME_LENGTH} characters`);
  }

  changeName(name: string) {
    Company.validateName(name);
    this.name = name;
    this.updatedAt = new Date();
  }
}

export { Company };
