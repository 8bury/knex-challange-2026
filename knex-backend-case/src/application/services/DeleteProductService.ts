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

    const user = await this.userRepository.findById(userId as UUID);
    if (!user || user.companyId !== product.companyId) throw new NotCompanyMemberError();

    await this.productRepository.softDelete(productId as UUID);
  }
}

export { DeleteProductService };
