import express from "express";
import dataSource from "./db/database";
import routes from "./modules";
import "metadata";
import cors from "cors";
import { errors } from "celebrate";

const connectWithRetry = async (maxAttempts = 10, delayMs = 3000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await dataSource.initialize();
      return;
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      console.warn(`DB connection attempt ${attempt}/${maxAttempts} failed, retrying in ${delayMs}ms...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
};

const main = async () => {
  await connectWithRetry();
  const port = Number(process.env.PORT);
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.static(__dirname + "/../uploads"));
  app.use(routes);
  app.use(errors());
  app.listen(port, () => console.log(`http://localhost:${port}`));
};

main();
