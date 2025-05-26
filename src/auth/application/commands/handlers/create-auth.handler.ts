import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthCommand } from './create-auth.command';
import { AuthService } from '../../services/auth/auth.service';

@CommandHandler(CreateAuthCommand)
export class CreateAuthHandler implements ICommandHandler<CreateAuthCommand> {
  constructor(private readonly service: AuthService) {}

  async execute(command: CreateAuthCommand) {
    return this.service.create(command.dto);
  }
}
