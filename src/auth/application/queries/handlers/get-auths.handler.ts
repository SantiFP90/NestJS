import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAuthsQuery } from './get-auths.query';
import { AuthService } from '../../services/auth/auth.service';

@QueryHandler(GetAuthsQuery)
export class GetAuthsHandler implements IQueryHandler<GetAuthsQuery> {
  constructor(private readonly service: AuthService) {}

  async execute() {
    return this.service.findAll();
  }
}
