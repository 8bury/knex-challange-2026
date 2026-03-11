type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
}

type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
}

type ProductOutput = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export { CreateProductInput, UpdateProductInput, ProductOutput };
