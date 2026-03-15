import { UUID } from "crypto";
import { Product } from "../entities/product.js";

type ListProductsParams = {
  page: number;
  limit: number;
  search?: string;
  companyId?: string;
  minPrice?: number;
  maxPrice?: number;
};

type ProductWithCompany = {
  product: Product;
  company: { id: string; name: string };
};

interface IProductRepository {
  findById(id: UUID): Promise<Product | null>;
  findByIdWithCompany(id: UUID): Promise<ProductWithCompany | null>;
  findAll(params: ListProductsParams): Promise<{ items: ProductWithCompany[]; total: number }>;
  save(product: Product): Promise<void>;
}

export { IProductRepository, ListProductsParams, ProductWithCompany };
