import dataSource from "../../../db/database";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../../../config/jwt-config";
import Product from "../../../db/models/product.entity";

const showProductsByUser = async (request: Request, response: Response) => {
  const token = String(request.headers.authorization);
  const jwtPayload = jwt.verify(token, jwtConfig.secret) as { user_id: number };
  const query = dataSource.getRepository(Product).createQueryBuilder("products");
  query.leftJoinAndSelect("products.store", "store");
  query.leftJoinAndSelect("products.file", "file");
  query.where("store.user_id = :userId", { userId: jwtPayload.user_id });
  query.orderBy("products.index", "ASC", "NULLS LAST");
  const products = await query.getMany();
  return response.status(200).json({ products });
};

export default showProductsByUser;
