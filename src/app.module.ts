import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database/typeorm.config";
import { ConfigModule } from "@nestjs/config";

import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
