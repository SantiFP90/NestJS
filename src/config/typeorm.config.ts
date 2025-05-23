import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/domain/entities/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "qwe-7890",
  database: "Tasks",
  entities: [Task],
  synchronize: true,
  options: {
    encrypt: false,
  },
};
