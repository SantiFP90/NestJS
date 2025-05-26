import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './presentation/users.controller';
import { UsersRepositoryService } from './infrastructure/repository/users-repository.service';
import { UsersService } from './application/services/users/users.service';
import { CreateUsersHandler } from './application/commands/handlers/create-users.handler';
import { GetUserssHandler } from './application/queries/handlers/get-userss.handler';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersRepositoryService,
    UsersService,
    CreateUsersHandler,
    GetUserssHandler
  ],
})
export class UsersModule {}
