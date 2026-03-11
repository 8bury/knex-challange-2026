import { UUID } from "crypto";

class Company {
  constructor(
    public readonly id: UUID,
    public name: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) { }

  changeName(name: string) {
    if (!name.trim()) {
      throw new Error("Name cannot be empty");
    }
    this.name = name;
    this.updatedAt = new Date();
  }
}