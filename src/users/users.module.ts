import { Module } from "@nestjs/common";
import { UsersController } from "./presentation/users.controller";
import { UsersRepositoryService } from "./infrastructure/repository/users-repository.service";
import { UsersService } from "./application/services/users/users.service";
import { CreateUsersHandler } from "./application/commands/handlers/create-users.handler";
import { GetUserssHandler } from "./application/queries/handlers/get-userss.handler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./domain/entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    CreateUsersHandler,
    GetUserssHandler,
    UsersRepositoryService,
    UsersService,
  ],
})
export class UsersModule {}
