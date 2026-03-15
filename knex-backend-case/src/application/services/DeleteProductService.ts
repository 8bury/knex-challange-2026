import { UUID } from "crypto";
import { NotCompanyMemberError } from "../../domain/errors/NotCompanyMemberError.js";
import { ProductNotFoundError } from "../../domain/errors/ProductNotFoundError.js";
import { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";

class DeleteProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId as UUID);
    if (!product) throw new ProductNotFoundError();

    const userCompanyId = await this.userRepository.findCompanyId(userId as UUID);
    if (userCompanyId !== product.companyId) throw new NotCompanyMemberError();

    product.softDelete();
    await this.productRepository.save(product);
  }
}

export { DeleteProductService };
