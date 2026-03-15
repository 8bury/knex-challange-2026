class InsufficientStockError extends Error {
  readonly statusCode = 409;
  constructor() {
    super("Insufficient stock");
    this.name = "InsufficientStockError";
  }
}

export { InsufficientStockError };
