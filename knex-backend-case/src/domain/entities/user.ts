import { randomUUID, UUID } from "crypto";
import { InvalidFieldError } from "../errors/InvalidFieldError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;

class User {
  private constructor(
    public readonly id: UUID,
    public name: string,
    public email: string,
    private passwordHash: string,
    public companyId: UUID | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public active: boolean,
  ) { }

  static criar(name: string, email: string, passwordHash: string): User {
    User.validateName(name);
    User.validateEmail(email);
    User.validatePasswordHash(passwordHash);
    return new User(randomUUID(), name, email, passwordHash, null, new Date(), new Date(), true);
  }

  static carregar(
    id: UUID,
    name: string,
    email: string,
    passwordHash: string,
    companyId: UUID | null,
    createdAt: Date,
    updatedAt: Date,
    active: boolean,
  ): User {
    return new User(id, name, email, passwordHash, companyId, createdAt, updatedAt, active);
  }

  private static validateName(name: string) {
    if (!name.trim()) throw new InvalidFieldError("name", "cannot be empty");
    if (name.trim().length < MIN_NAME_LENGTH) throw new InvalidFieldError("name", `must be at least ${MIN_NAME_LENGTH} characters`);
  }

  private static validateEmail(email: string) {
    if (!email.trim()) throw new InvalidFieldError("email", "cannot be empty");
    if (!EMAIL_REGEX.test(email)) throw new InvalidFieldError("email", "invalid format");
  }

  private static validatePasswordHash(passwordHash: string) {
    if (!passwordHash.trim()) throw new InvalidFieldError("password", "cannot be empty");
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  isCollaborator(): boolean {
    return this.companyId !== null;
  }

  linkToCompany(companyId: UUID) {
    this.companyId = companyId;
    this.updatedAt = new Date();
  }

  unlinkFromCompany() {
    this.companyId = null;
    this.updatedAt = new Date();
  }

  changeName(name: string) {
    User.validateName(name);
    this.name = name;
    this.updatedAt = new Date();
  }

  changeEmail(email: string) {
    User.validateEmail(email);
    this.email = email;
    this.updatedAt = new Date();
  }

  changePassword(newPasswordHash: string) {
    User.validatePasswordHash(newPasswordHash);
    this.passwordHash = newPasswordHash;
    this.updatedAt = new Date();
  }

  deactivate() {
    this.active = false;
    this.updatedAt = new Date();
  }

  activate() {
    this.active = true;
    this.updatedAt = new Date();
  }
}

export { User };
