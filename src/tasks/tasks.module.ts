import { Module } from "@nestjs/common";
import { CreateTaskHandler } from "./aplication/commands/handlers/create-task.handler";
import { GetTasksHandler } from "./aplication/queries/handlers/get-tasks.handler";
import { TasksController } from "./presentation/tasks.controller";
import { TaskRepositoryService } from "./infrastructure/repository/task-repository.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./domain/entities/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [CreateTaskHandler, GetTasksHandler, TaskRepositoryService],
})
export class TasksModule {}
