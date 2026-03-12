import { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import { ProductListOutput } from "../dtos/product.dto.js";

type ListProductsInput = {
  page?: number;
  limit?: number;
  search?: string;
  companyId?: string;
  minPrice?: number;
  maxPrice?: number;
};

class ListProductsService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: ListProductsInput): Promise<ProductListOutput> {
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;

    const { items, total } = await this.productRepository.findAll({
      page,
      limit,
      search: input.search,
      companyId: input.companyId,
      minPrice: input.minPrice,
      maxPrice: input.maxPrice,
    });

    return {
      data: items.map(({ product: p, company }) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        company,
        createdAt: p.createdAt,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}

export { ListProductsService };
