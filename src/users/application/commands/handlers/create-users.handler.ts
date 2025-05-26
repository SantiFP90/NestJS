import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUsersCommand } from './create-users.command';
import { UsersService } from '../../services/users/users.service';

@CommandHandler(CreateUsersCommand)
export class CreateUsersHandler implements ICommandHandler<CreateUsersCommand> {
  constructor(private readonly service: UsersService) {}

  async execute(command: CreateUsersCommand) {
    return this.service.create(command.dto);
  }
}
