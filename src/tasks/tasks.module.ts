import { Module } from "@nestjs/common";
import { CreateTaskHandler } from "./aplication/commands/handlers/create-task.handler";
import { GetTasksHandler } from "./aplication/queries/handlers/get-tasks.handler";
import { TasksController } from "./presentation/tasks.controller";
import { TaskRepositoryService } from "./infrastructure/repository/task-repository.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tasks } from "./domain/entities/task.entity";
import { TaskService } from "./aplication/services/task/task.service";

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TasksController],
  providers: [
    CreateTaskHandler,
    GetTasksHandler,
    TaskRepositoryService,
    TaskService,
  ],
})
export class TasksModule {}
