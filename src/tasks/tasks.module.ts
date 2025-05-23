import { Module } from "@nestjs/common";
import { CreateTaskHandler } from "./commands/handlers/create-task.handler";
import { GetTasksHandler } from "./queries/handlers/get-tasks.handler";
import { TasksController } from "./presentation/tasks.controller";
import { TaskService } from "./aplication/task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./domain/entities/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [CreateTaskHandler, GetTasksHandler, TaskService],
})
export class TasksModule {}
