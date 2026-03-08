import { Request, Response } from "express";
import User from "../../../db/models/user.entity";
import dataSource from "../../../db/database";
import bcrypt from "bcrypt";
import Store from "../../../db/models/store.entity";

const register = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUserInstance = dataSource
    .getRepository(User)
    .create({ name, email, password: hashedPassword });
  const storeName = `${name}'s Store`;
  const createStoreInstance = dataSource
    .getRepository(Store)
    .create({ name: storeName, description: `This is the store of ${name}` });
  createStoreInstance.user = createUserInstance;
  createUserInstance.store = createStoreInstance;
  const saveUser = await dataSource.getRepository(User).save(createUserInstance);
  const saveStore = await dataSource.getRepository(Store).save(createStoreInstance);
  return response.status(201).json({ message: "User and store registered successfully" });
};

export default register;
