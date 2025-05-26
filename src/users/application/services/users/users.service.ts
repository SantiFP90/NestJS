import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUsersDto } from "../../../presentation/dto/create-users.dto";
import { Users } from "../../../domain/entities/users.entity";
import { UsersRepositoryService } from "../../../infrastructure/repository/users-repository.service";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositoryService) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const { email_user, password } = createUsersDto;

    if (email_user.length < 5 || email_user.length > 100) {
      throw new BadRequestException(
        "El email debe tener entre 5 y 100 caracteres."
      );
    }

    if (password.length < 8 || password.length > 100) {
      throw new BadRequestException(
        "La contraseña debe tener entre 8 y 100 caracteres."
      );
    }

    const user = new Users();
    user.email_user = email_user;
    user.password = password;

    return this.usersRepository.create(user);
  }

  async update(id: string, dto: CreateUsersDto): Promise<Users> {
    const { email_user, password } = dto;

    if (email_user.length < 5 || email_user.length > 100) {
      throw new BadRequestException(
        "El email debe tener entre 5 y 100 caracteres."
      );
    }

    if (password.length < 8 || password.length > 100) {
      throw new BadRequestException(
        "La contraseña debe tener entre 8 y 100 caracteres."
      );
    }

    const updatedUser = new Users();
    updatedUser.id = id;
    updatedUser.email_user = email_user;
    updatedUser.password = password;

    return this.usersRepository.create(updatedUser);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    return this.usersRepository.remove(id);
  }
}
