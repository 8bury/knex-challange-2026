import { Router } from "express";
import loadImageInMemory from "../../utils/load-image-in-memory";
import createFile from "./services/create-file.service";

const filesRoutes = Router();

filesRoutes.post("/", loadImageInMemory.single("file"), createFile);

export default filesRoutes;
