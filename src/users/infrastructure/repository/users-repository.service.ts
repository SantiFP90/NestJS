import { Injectable } from '@nestjs/common';
import { Users } from '../../domain/entities/users.entity';

@Injectable()
export class UsersRepositoryService {
  private items: Users[] = [];

  save(entity: Users): Users {
    this.items.push(entity);
    return entity;
  }

  findAll(): Users[] {
    return this.items;
  }
}
