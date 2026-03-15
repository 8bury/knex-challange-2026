import { UUID } from "crypto";
import { NotCompanyMemberError } from "../../domain/errors/NotCompanyMemberError.js";
import { ProductNotFoundError } from "../../domain/errors/ProductNotFoundError.js";
import { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { UpdateProductInput, ProductOutput } from "../dtos/product.dto.js";

class UpdateProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, productId: string, input: UpdateProductInput): Promise<ProductOutput> {
    const product = await this.productRepository.findById(productId as UUID);
    if (!product) throw new ProductNotFoundError();

    const userCompanyId = await this.userRepository.findCompanyId(userId as UUID);
    if (userCompanyId !== product.companyId) throw new NotCompanyMemberError();

    if (input.name !== undefined) product.changeName(input.name);
    if (input.description !== undefined) product.changeDescription(input.description);
    if (input.price !== undefined) product.changePrice(input.price);
    if (input.stock !== undefined) product.changeStock(input.stock);

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

export { UpdateProductService };
