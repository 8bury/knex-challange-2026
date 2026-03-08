import dataSource from "../../../db/database";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../../../config/jwt-config";
import Product from "../../../db/models/product.entity";

const deleteProductByUser = async (request: Request, response: Response) => {
  const { product_id } = request.body;
  const token = String(request.headers.authorization);
  const jwtPayload = jwt.verify(token, jwtConfig.secret) as { user_id: number };
  const foundProduct = await dataSource
    .getRepository(Product)
    .findOne({ where: { id: product_id }, relations: ["store", "store.user"] });
  if (!foundProduct) {
    return response.status(404).json({ message: "Product not found" });
  }
  if (foundProduct.store.user.id !== jwtPayload.user_id) {
    return response.status(403).json({ message: "You are not the owner of this product" });
  }
  await dataSource.getRepository(Product).delete(foundProduct.id);
  return response.status(200).json({ message: "Product deleted successfully" });
};

export default deleteProductByUser;
