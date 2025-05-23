import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TaskRepository } from "./repositories/task.repository";
import { CreateTaskHandler } from "./commands/handlers/create-task.handler";
import { GetTasksHandler } from "./queries/handlers/get-tasks.handler";
import { TasksController } from "./presentation/tasks.controller";

@Module({
  imports: [CqrsModule],
  controllers: [TasksController],
  providers: [TaskRepository, CreateTaskHandler, GetTasksHandler],
})
export class TasksModule {}
