import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Task } from "src/tasks/domain/entities/task.entity";
import { TaskService } from "../../services/task/task.service";

export class GetTasksQuery {}

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly service: TaskService) {}

  async execute(query: GetTasksQuery): Promise<Task[]> {
    return await this.service.findAll();
  }
}
