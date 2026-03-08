import dataSource from "../../../db/database";
import File from "../../../db/models/file.entity";
import { Request, Response } from "express";
import saveImage from "../../../utils/save-image";

const createFile = async (request: Request, response: Response) => {
  const file = request.file;
  if (!file) {
    return response.status(400).json({ message: "File is required" });
  }
  const { originalname, imagePath } = await saveImage(file);
  const createFile = dataSource.getRepository(File).create({ name: originalname, path: imagePath });
  const saveFile = await dataSource.getRepository(File).save(createFile);
  return response.status(201).json({ message: "File created successfully", file: saveFile });
};

export default createFile;
