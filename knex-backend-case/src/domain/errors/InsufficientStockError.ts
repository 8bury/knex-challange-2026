class InsufficientStockError extends Error {
  constructor() {
    super("Insufficient stock");
    this.name = "InsufficientStockError";
  }
}

export { InsufficientStockError };
