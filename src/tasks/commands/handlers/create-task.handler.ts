import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTaskDto } from "../../presentation/dto/create-task.dto";
import { Task } from "src/tasks/domain/entities/task.entity";
import { TaskService } from "src/tasks/aplication/task.service";

export class CreateTaskCommand {
  constructor(public readonly dto: CreateTaskDto) {}
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly service: TaskService) {}

  async execute(command: CreateTaskCommand): Promise<Task> {
    const { title, description } = command.dto;
    return this.service.create(title, description);
  }
}
