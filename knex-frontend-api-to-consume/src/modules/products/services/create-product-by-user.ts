import dataSource from "../../../db/database";
import { Request, Response } from "express";
import Product from "../../../db/models/product.entity";
import jwt from "jsonwebtoken";
import jwtConfig from "../../../config/jwt-config";
import Store from "../../../db/models/store.entity";
import File from "../../../db/models/file.entity";

const createProductByUser = async (request: Request, response: Response) => {
  const { name, description, price, file_id } = request.body;
  const token = String(request.headers.authorization);
  const jwtPayload = jwt.verify(token, jwtConfig.secret) as { user_id: number };
  const foundStore = await dataSource
    .getRepository(Store)
    .findOne({ where: { user: { id: jwtPayload.user_id } } });
  if (!foundStore) {
    return response.status(404).json({ message: "Store not found" });
  }
  const foundFile = await dataSource.getRepository(File).findOne({ where: { id: file_id } });
  if (!foundFile) {
    return response.status(404).json({ message: "File not found" });
  }
  const createProductInstance = dataSource.getRepository(Product).create({
    name,
    description,
    price,
  });
  createProductInstance.file = foundFile;
  createProductInstance.store = foundStore;
  const saveProduct = await dataSource.getRepository(Product).save(createProductInstance);
  return response
    .status(201)
    .json({ message: "Product created successfully", product: saveProduct });
};

export default createProductByUser;
