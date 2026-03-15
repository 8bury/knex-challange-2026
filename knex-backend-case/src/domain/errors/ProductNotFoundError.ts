class ProductNotFoundError extends Error {
  readonly statusCode = 404;
  constructor() {
    super("Product not found");
    this.name = "ProductNotFoundError";
  }
}

export { ProductNotFoundError };
