import { UUID } from "crypto";

class Product {
  constructor(
    public readonly id: UUID,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public companyId: UUID,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) { }

  increaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    this.stock += quantity;
    this.updatedAt = new Date();
  }
  
  decreaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    if (quantity > this.stock) {
      throw new Error("Insufficient stock");
    }
    this.stock -= quantity;
    this.updatedAt = new Date();
  }
  
  changeName(newName: string) {
    if (!newName.trim()) {
      throw new Error("Name cannot be empty");
    }
    this.name = newName;
    this.updatedAt = new Date();
  }
  
  changePrice(newPrice: number) {
    if (newPrice <= 0) {
      throw new Error("Price must be greater than zero");
    }
    this.price = newPrice;
    this.updatedAt = new Date();
  }
  
  changeDescription(newDescription: string) {
    if (!newDescription.trim()) {
      throw new Error("Description cannot be empty");
    }
    this.description = newDescription;
    this.updatedAt = new Date();
  }
}