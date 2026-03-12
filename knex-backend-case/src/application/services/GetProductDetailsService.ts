import { UUID } from "crypto";
import { ProductNotFoundError } from "../../domain/errors/ProductNotFoundError.js";
import { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import { ProductDetailsOutput } from "../dtos/product.dto.js";

class GetProductDetailsService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<ProductDetailsOutput> {
    const result = await this.productRepository.findByIdWithCompany(id as UUID);
    if (!result) throw new ProductNotFoundError();

    const { product: p, company } = result;
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      company,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}

export { GetProductDetailsService };
