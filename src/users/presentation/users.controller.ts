import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUsersDto } from './dto/create-users.dto';
import { CreateUsersCommand } from '../application/commands/handlers/create-users.command';
import { GetUserssQuery } from '../application/queries/handlers/get-userss.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateUsersDto) {
    return this.commandBus.execute(new CreateUsersCommand(dto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetUserssQuery());
  }
}
