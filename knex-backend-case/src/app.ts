import "dotenv/config";
import express from "express";
import { healthRouter } from "./http/routes/health.routes.js";
import { authRouter } from "./http/routes/auth.routes.js";

export const app = express();

app.use(express.json());

app.use("/api", healthRouter);
app.use("/api", authRouter);
