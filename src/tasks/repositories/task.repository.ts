import { Task } from "../domain/entities/task.entity";
import { v4 as uuidv4 } from "uuid";

export class TaskRepository {
  private tasks: Task[] = [];

  create(task: Task): Task {
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }
}
