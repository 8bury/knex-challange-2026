import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { healthRouter } from "./http/routes/health.routes.js";
import { authRouter } from "./http/routes/auth.routes.js";
import { companyRouter } from "./http/routes/company.routes.js";
import { productRouter } from "./http/routes/product.routes.js";
import { transactionRouter } from "./http/routes/transaction.routes.js";

export const app = express();

app.use(express.json());

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", companyRouter);
app.use("/api", productRouter);
app.use("/api", transactionRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(422).json({ error: "Validation error", details: err.flatten().fieldErrors });
    return;
  }
  if ("statusCode" in err && typeof (err as any).statusCode === "number") {
    res.status((err as any).statusCode).json({ error: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
