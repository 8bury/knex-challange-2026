import jwtConfig from "../../../config/jwt-config";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dataSource from "../../../db/database";
import Product from "../../../db/models/product.entity";

const updateProductByUser = async (request: Request, response: Response) => {
  const { product_id, name, description, price, index } = request.body;
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

  if (name !== undefined) foundProduct.name = name;
  if (description !== undefined) foundProduct.description = description;
  if (price !== undefined) foundProduct.price = price;
  if (index !== undefined) foundProduct.index = index;

  const updatedProduct = await dataSource
    .getRepository(Product)
    .update(foundProduct.id, foundProduct);
  return response
    .status(200)
    .json({ message: "Product updated successfully", product: updatedProduct });
};

export default updateProductByUser;
