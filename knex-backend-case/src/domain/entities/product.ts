import { randomUUID, UUID } from "crypto";
import { InvalidFieldError } from "../errors/InvalidFieldError.js";

const MIN_NAME_LENGTH = 2;
const MIN_DESCRIPTION_LENGTH = 10;

class Product {
  private constructor(
    public readonly id: UUID,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public companyId: UUID,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) { }

  static criar(
    name: string,
    description: string,
    price: number,
    stock: number,
    companyId: UUID,
  ): Product {
    Product.validateName(name);
    Product.validateDescription(description);
    Product.validatePrice(price);
    Product.validateStock(stock);
    return new Product(randomUUID(), name, description, price, stock, companyId, new Date(), new Date(), null);
  }

  static carregar(
    id: UUID,
    name: string,
    description: string,
    price: number,
    stock: number,
    companyId: UUID,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null = null,
  ): Product {
    return new Product(id, name, description, price, stock, companyId, createdAt, updatedAt, deletedAt);
  }

  private static validateName(name: string) {
    if (!name.trim()) throw new InvalidFieldError("name", "cannot be empty");
    if (name.trim().length < MIN_NAME_LENGTH) throw new InvalidFieldError("name", `must be at least ${MIN_NAME_LENGTH} characters`);
  }

  private static validateDescription(description: string) {
    if (!description.trim()) throw new InvalidFieldError("description", "cannot be empty");
    if (description.trim().length < MIN_DESCRIPTION_LENGTH) throw new InvalidFieldError("description", `must be at least ${MIN_DESCRIPTION_LENGTH} characters`);
  }

  private static validatePrice(price: number) {
    if (price <= 0) throw new InvalidFieldError("price", "must be greater than zero");
  }

  private static validateStock(stock: number) {
    if (stock < 0) throw new InvalidFieldError("stock", "cannot be negative");
  }

  increaseStock(quantity: number) {
    if (quantity <= 0) throw new InvalidFieldError("quantity", "must be greater than zero");
    this.stock += quantity;
    this.updatedAt = new Date();
  }

  decreaseStock(quantity: number) {
    if (quantity <= 0) throw new InvalidFieldError("quantity", "must be greater than zero");
    if (quantity > this.stock) throw new InvalidFieldError("quantity", "insufficient stock");
    this.stock -= quantity;
    this.updatedAt = new Date();
  }

  changeName(newName: string) {
    Product.validateName(newName);
    this.name = newName;
    this.updatedAt = new Date();
  }

  changePrice(newPrice: number) {
    Product.validatePrice(newPrice);
    this.price = newPrice;
    this.updatedAt = new Date();
  }

  changeDescription(newDescription: string) {
    Product.validateDescription(newDescription);
    this.description = newDescription;
    this.updatedAt = new Date();
  }

  changeStock(newStock: number) {
    Product.validateStock(newStock);
    this.stock = newStock;
    this.updatedAt = new Date();
  }

  softDelete() {
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}

export { Product };
