import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { healthRouter } from "./http/routes/health.routes.js";
import { authRouter } from "./http/routes/auth.routes.js";
import { companyRouter } from "./http/routes/company.routes.js";

export const app = express();

app.use(express.json());

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", companyRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
