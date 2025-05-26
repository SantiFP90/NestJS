import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database/typeorm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeOrmConfig(configService),
    }),
    CqrsModule.forRoot(),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
