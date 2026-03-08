import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products";
import filesRoutes from "./files";
import globalErrorHandler from "../utils/global-error-handler";

const routes = Router();

routes.use(globalErrorHandler);

routes.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

routes.use("/auth", authRoutes);
routes.use("/products", productsRoutes);
routes.use("/files", filesRoutes);

export default routes;
