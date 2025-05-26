import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './presentation/auth.controller';
import { AuthRepositoryService } from './infrastructure/repository/auth-repository.service';
import { AuthService } from './application/services/auth/auth.service';
import { CreateAuthHandler } from './application/commands/handlers/create-auth.handler';
import { GetAuthsHandler } from './application/queries/handlers/get-auths.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [
    AuthRepositoryService,
    AuthService,
    CreateAuthHandler,
    GetAuthsHandler
  ],
})
export class AuthModule {}
