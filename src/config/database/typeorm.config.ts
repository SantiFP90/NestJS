import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Tasks } from "src/tasks/domain/entities/task.entity";
import { Users } from "src/users/domain/entities/users.entity";

export const typeOrmConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  const portString = configService.get<string>("DB_PORT");
  const port = portString ? parseInt(portString, 10) : 1433;

  return {
    type: (configService.get<string>("DB_TYPE") as any) || "mssql",
    host: configService.get<string>("DB_HOST"),
    port: port,
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_NAME"),
    entities: [Tasks, Users],
    synchronize: true,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };
};
