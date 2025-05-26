import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateTaskDto } from "src/tasks/presentation/dto/create-task.dto";
import { Tasks } from "src/tasks/domain/entities/task.entity";
import { TaskRepositoryService } from "../../../infrastructure/repository/task-repository.service";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepositoryService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;

    if (title.length < 5 || title.length > 20) {
      throw new BadRequestException(
        "El título debe tener entre 5 y 20 caracteres."
      );
    }

    if (description.length < 5 || description.length > 150) {
      throw new BadRequestException(
        "La descripción debe tener entre 5 y 150 caracteres."
      );
    }

    const task = new Tasks();
    task.title = title;
    task.description = description;

    return this.taskRepository.create(task);
  }

  async update(id: string, dto: CreateTaskDto): Promise<Tasks> {
    const { title, description } = dto;

    if (title.length < 5 || title.length > 20) {
      throw new BadRequestException(
        "El título debe tener entre 5 y 20 caracteres."
      );
    }

    if (description.length < 5 || description.length > 150) {
      throw new BadRequestException(
        "La descripción debe tener entre 5 y 150 caracteres."
      );
    }

    const updatedTask = new Tasks();
    updatedTask.id = id;
    updatedTask.title = title;
    updatedTask.description = description;

    return this.taskRepository.create(updatedTask);
  }

  async findAll(): Promise<Tasks[]> {
    return this.taskRepository.findAll();
  }

  async findOne(id: string): Promise<Tasks> {
    return this.taskRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    return this.taskRepository.remove(id);
  }
}
