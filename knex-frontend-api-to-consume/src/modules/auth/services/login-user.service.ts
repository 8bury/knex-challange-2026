import User from "../../../db/models/user.entity";
import dataSource from "../../../db/database";
import { Request, Response } from "express";
import jwtConfig from "../../../config/jwt-config";
import bcrypt from "bcrypt";
import jwt, { Algorithm } from "jsonwebtoken";

const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const user = await dataSource.getRepository(User).findOne({ where: { email } });
  if (!user) {
    return response.status(401).json({ message: "Failed to login. Invalid email or password." });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return response.status(401).json({ message: "Failed to login. Invalid email or password." });
  }
  const token = jwt.sign({ user_id: user.id }, jwtConfig.secret, {
    algorithm: jwtConfig.algorithm as Algorithm,
    expiresIn: jwtConfig.expiresIn,
  });
  return response.status(200).json({ message: "Login successful", token });
};

export default login;
