import multer from "multer";

const loadImageInMemory = multer({ storage: multer.memoryStorage() });

export default loadImageInMemory;
