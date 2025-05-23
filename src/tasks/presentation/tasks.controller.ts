import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateTaskDto } from "./dto/create-task.dto";
import { CreateTaskCommand } from "../commands/handlers/create-task.handler";
import { GetTasksQuery } from "../queries/handlers/get-tasks.handler";

@Controller("tasks")
export class TasksController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return this.commandBus.execute(new CreateTaskCommand(dto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetTasksQuery());
  }
}
