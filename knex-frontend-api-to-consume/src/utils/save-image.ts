import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const saveImage = async (image: Express.Multer.File) => {
  const imagePath = uuidv4() + "_" + image.originalname;
  const uploadsDir = path.join(__dirname + "/../../uploads");
  await fs.promises.mkdir(uploadsDir, { recursive: true });
  await fs.promises.writeFile(path.join(uploadsDir, imagePath), image.buffer);
  return { originalname: image.originalname, imagePath };
};

export default saveImage;
