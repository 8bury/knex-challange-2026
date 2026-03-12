type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
};

type ProductOutput = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProductListItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  company: { id: string; name: string };
  createdAt: Date;
};

type ProductListOutput = {
  data: ProductListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ProductDetailsOutput = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  company: { id: string; name: string };
  createdAt: Date;
  updatedAt: Date;
};

export { CreateProductInput, UpdateProductInput, ProductOutput, ProductListItem, ProductListOutput, ProductDetailsOutput };
