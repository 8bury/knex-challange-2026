import { UUID } from "crypto";
import { Product } from "../../domain/entities/product.js";
import { CompanyNotFoundError } from "../../domain/errors/CompanyNotFoundError.js";
import { NotCompanyMemberError } from "../../domain/errors/NotCompanyMemberError.js";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepository.js";
import { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { InvalidFieldError } from "../../domain/errors/InvalidFieldError.js";
import { CreateProductInput, ProductOutput } from "../dtos/product.dto.js";

class CreateProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly companyRepository: ICompanyRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, companyId: string, input: CreateProductInput): Promise<ProductOutput> {
    if (!input.name) throw new InvalidFieldError("name", "cannot be empty");
    if (!input.description) throw new InvalidFieldError("description", "cannot be empty");
    if (input.price === undefined || input.price === null) throw new InvalidFieldError("price", "cannot be empty");
    if (input.stock === undefined || input.stock === null) throw new InvalidFieldError("stock", "cannot be empty");

    const company = await this.companyRepository.findById(companyId as UUID);
    if (!company) throw new CompanyNotFoundError();

    const user = await this.userRepository.findById(userId as UUID);
    if (!user || user.companyId !== company.id) throw new NotCompanyMemberError();

    const product = Product.criar(input.name, input.description, input.price, input.stock, company.id);
    await this.productRepository.save(product);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      companyId: product.companyId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}

export { CreateProductService };
