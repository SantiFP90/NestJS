import { CreateUsersDto } from '../../../presentation/dto/create-users.dto';

export class CreateUsersCommand {
  constructor(public readonly dto: CreateUsersDto) {}
}
