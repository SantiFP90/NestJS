import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/domain/entities/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: (process.env.DB_TYPE as any) || "mssql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task],
  synchronize: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
