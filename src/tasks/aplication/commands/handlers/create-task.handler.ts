import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTaskDto } from "../../../presentation/dto/create-task.dto";
import { Tasks } from "src/tasks/domain/entities/task.entity";
import { TaskService } from "../../services/task/task.service";

export class CreateTaskCommand {
  constructor(public readonly dto: CreateTaskDto) {}
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly service: TaskService) {}

  async execute(command: CreateTaskCommand): Promise<Tasks> {
    return this.service.create(command.dto);
  }
}
