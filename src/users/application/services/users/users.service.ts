import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from '../../../presentation/dto/create-users.dto';
import { Users } from '../../../domain/entities/users.entity';
import { UsersRepositoryService } from '../../../infrastructure/repository/users-repository.service';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepositoryService) {}

  create(_dto: CreateUsersDto): Users {
    const entity = new Users();
    return this.repo.save(entity);
  }

  findAll(): Users[] {
    return this.repo.findAll();
  }
}
