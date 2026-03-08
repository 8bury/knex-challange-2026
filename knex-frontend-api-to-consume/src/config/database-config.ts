import { DataSourceOptions } from "typeorm";

const databaseConfig = {
  type: String(process.env.TYPEORM_TYPE),
  host: String(process.env.TYPEORM_HOST),
  port: Number(process.env.TYPEORM_PORT),
  username: String(process.env.TYPEORM_USERNAME),
  password: String(process.env.TYPEORM_PASSWORD),
  database: String(process.env.TYPEORM_DATABASE),
  entities: [String(__dirname + process.env.TYPEORM_ENTITIES)],
  synchronize: true,
} as DataSourceOptions;

export default databaseConfig;
