import { Injectable } from "@nestjs/common";
import { Task } from "../domain/entities/task.entity";
import { TaskRepository } from "../repositories/task.repository";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  async create(title: string, description: string): Promise<Task> {
    const task = new Task(uuidv4(), title, description);
    return this.taskRepo.create(task);
  }

  findAll(): Task[] {
    return this.taskRepo.findAll();
  }
}
