import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tasks } from "../../domain/entities/task.entity";

@Injectable()
export class TaskRepositoryService {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>
  ) {}

  async create(task: Tasks): Promise<Tasks> {
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Tasks[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Tasks> {
    return this.taskRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
