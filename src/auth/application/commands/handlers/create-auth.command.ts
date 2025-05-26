import { CreateAuthDto } from '../../../presentation/dto/create-auth.dto';

export class CreateAuthCommand {
  constructor(public readonly dto: CreateAuthDto) {}
}
