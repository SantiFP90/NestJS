import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserssQuery } from "./get-userss.query";
import { UsersService } from "../../services/users/users.service";

@QueryHandler(GetUserssQuery)
export class GetUserssHandler implements IQueryHandler<GetUserssQuery> {
  constructor(private readonly service: UsersService) {}

  async execute() {
    return this.service.findAll();
  }
}
