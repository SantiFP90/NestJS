#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Por favor, proporciona un nombre de módulo. Ej: ./generate-cqrs-module.sh tasks"
  exit 1 
fi

NAME=$1
LOWER=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')
CAPITALIZED=$(echo "${NAME^}")

echo "🚀 Generando módulo CQRS estructurado: $CAPITALIZED..."

# Crear estructura de carpetas
mkdir -p src/$LOWER/{application/commands/handlers,application/queries/handlers,application/services/$LOWER,domain/entities,infrastructure/repository,presentation/dto}

# DTO
cat > src/$LOWER/presentation/dto/create-${LOWER}.dto.ts <<EOF
export class Create${CAPITALIZED}Dto {}
EOF

# Entidad
cat > src/$LOWER/domain/entities/${LOWER}.entity.ts <<EOF
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ${CAPITALIZED} {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
EOF

# Repositorio
cat > src/$LOWER/infrastructure/repository/${LOWER}-repository.service.ts <<EOF
import { Injectable } from '@nestjs/common';
import { ${CAPITALIZED} } from '../../domain/entities/${LOWER}.entity';

@Injectable()
export class ${CAPITALIZED}RepositoryService {
  private items: ${CAPITALIZED}[] = [];

  save(entity: ${CAPITALIZED}): ${CAPITALIZED} {
    this.items.push(entity);
    return entity;
  }

  findAll(): ${CAPITALIZED}[] {
    return this.items;
  }
}
EOF

# Application Service
cat > src/$LOWER/application/services/$LOWER/${LOWER}.service.ts <<EOF
import { Injectable } from '@nestjs/common';
import { Create${CAPITALIZED}Dto } from '../../../presentation/dto/create-${LOWER}.dto';
import { ${CAPITALIZED} } from '../../../domain/entities/${LOWER}.entity';
import { ${CAPITALIZED}RepositoryService } from '../../../infrastructure/repository/${LOWER}-repository.service';

@Injectable()
export class ${CAPITALIZED}Service {
  constructor(private readonly repo: ${CAPITALIZED}RepositoryService) {}

  create(_dto: Create${CAPITALIZED}Dto): ${CAPITALIZED} {
    const entity = new ${CAPITALIZED}();
    return this.repo.save(entity);
  }

  findAll(): ${CAPITALIZED}[] {
    return this.repo.findAll();
  }
}
EOF

# Command y Handler
cat > src/$LOWER/application/commands/handlers/create-${LOWER}.command.ts <<EOF
import { Create${CAPITALIZED}Dto } from '../../../presentation/dto/create-${LOWER}.dto';

export class Create${CAPITALIZED}Command {
  constructor(public readonly dto: Create${CAPITALIZED}Dto) {}
}
EOF

cat > src/$LOWER/application/commands/handlers/create-${LOWER}.handler.ts <<EOF
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Create${CAPITALIZED}Command } from './create-${LOWER}.command';
import { ${CAPITALIZED}Service } from '../../services/${LOWER}/${LOWER}.service';

@CommandHandler(Create${CAPITALIZED}Command)
export class Create${CAPITALIZED}Handler implements ICommandHandler<Create${CAPITALIZED}Command> {
  constructor(private readonly service: ${CAPITALIZED}Service) {}

  async execute(command: Create${CAPITALIZED}Command) {
    return this.service.create(command.dto);
  }
}
EOF

# Query y Handler
cat > src/$LOWER/application/queries/handlers/get-${LOWER}s.query.ts <<EOF
export class Get${CAPITALIZED}sQuery {}
EOF

cat > src/$LOWER/application/queries/handlers/get-${LOWER}s.handler.ts <<EOF
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Get${CAPITALIZED}sQuery } from './get-${LOWER}s.query';
import { ${CAPITALIZED}Service } from '../../services/${LOWER}/${LOWER}.service';

@QueryHandler(Get${CAPITALIZED}sQuery)
export class Get${CAPITALIZED}sHandler implements IQueryHandler<Get${CAPITALIZED}sQuery> {
  constructor(private readonly service: ${CAPITALIZED}Service) {}

  async execute() {
    return this.service.findAll();
  }
}
EOF

# Controller
cat > src/$LOWER/presentation/${LOWER}.controller.ts <<EOF
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Create${CAPITALIZED}Dto } from './dto/create-${LOWER}.dto';
import { Create${CAPITALIZED}Command } from '../application/commands/handlers/create-${LOWER}.command';
import { Get${CAPITALIZED}sQuery } from '../application/queries/handlers/get-${LOWER}s.query';

@Controller('${LOWER}')
export class ${CAPITALIZED}Controller {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: Create${CAPITALIZED}Dto) {
    return this.commandBus.execute(new Create${CAPITALIZED}Command(dto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new Get${CAPITALIZED}sQuery());
  }
}
EOF

# Module
cat > src/$LOWER/${LOWER}.module.ts <<EOF
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ${CAPITALIZED}Controller } from './presentation/${LOWER}.controller';
import { ${CAPITALIZED}RepositoryService } from './infrastructure/repository/${LOWER}-repository.service';
import { ${CAPITALIZED}Service } from './application/services/${LOWER}/${LOWER}.service';
import { Create${CAPITALIZED}Handler } from './application/commands/handlers/create-${LOWER}.handler';
import { Get${CAPITALIZED}sHandler } from './application/queries/handlers/get-${LOWER}s.handler';

@Module({
  imports: [CqrsModule],
  controllers: [${CAPITALIZED}Controller],
  providers: [
    ${CAPITALIZED}RepositoryService,
    ${CAPITALIZED}Service,
    Create${CAPITALIZED}Handler,
    Get${CAPITALIZED}sHandler
  ],
})
export class ${CAPITALIZED}Module {}
EOF

echo "✅ Módulo $CAPITALIZED CQRS generado con éxito en estructura nueva."
