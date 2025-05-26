import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../../domain/entities/task.entity";

@Injectable()
export class TaskRepositoryService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async create(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
