import { Injectable } from '@nestjs/common';
import { Auth } from '../../domain/entities/auth.entity';

@Injectable()
export class AuthRepositoryService {
  private items: Auth[] = [];

  save(entity: Auth): Auth {
    this.items.push(entity);
    return entity;
  }

  findAll(): Auth[] {
    return this.items;
  }
}
