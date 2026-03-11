import express from "express";
import { healthRouter } from "./http/routes/health.routes";

export const app = express();

app.use(express.json());

app.use(healthRouter);
