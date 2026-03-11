import { UUID } from "crypto";

class User {
  constructor(
    public readonly id: UUID,
    public name: string,
    public email: string,
    private passwordHash: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public active: boolean = true,
  ) { }
  
  changeName(name: string) {
    if (!name.trim()) {
      throw new Error("Name cannot be empty");
    }
    this.name = name;
    this.updatedAt = new Date();
  }
  
  changeEmail(email: string) {
    if (!email.trim()) {
      throw new Error("Email cannot be empty");
    }
    this.email = email;
    this.updatedAt = new Date();
  }
  
  changePassword(newPasswordHash: string) {
    if (!newPasswordHash.trim()) {
      throw new Error("Password cannot be empty");
    }
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
