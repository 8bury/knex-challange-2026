import express from "express";
import dataSource from "./db/database";
import routes from "./modules";
import "metadata";
import cors from "cors";
import { errors } from "celebrate";

const main = async () => {
  await dataSource.initialize();
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
