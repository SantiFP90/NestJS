import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../../../presentation/dto/create-auth.dto';
import { Auth } from '../../../domain/entities/auth.entity';
import { AuthRepositoryService } from '../../../infrastructure/repository/auth-repository.service';

@Injectable()
export class AuthService {
  constructor(private readonly repo: AuthRepositoryService) {}

  create(_dto: CreateAuthDto): Auth {
    const entity = new Auth();
    return this.repo.save(entity);
  }

  findAll(): Auth[] {
    return this.repo.findAll();
  }
}
