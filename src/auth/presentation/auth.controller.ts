import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateAuthCommand } from '../application/commands/handlers/create-auth.command';
import { GetAuthsQuery } from '../application/queries/handlers/get-auths.query';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateAuthDto) {
    return this.commandBus.execute(new CreateAuthCommand(dto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAuthsQuery());
  }
}
