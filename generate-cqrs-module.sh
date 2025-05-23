#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Por favor, proporciona un nombre de módulo. Ej: ./generate-cqrs-module.sh tasks"
  exit 1 
fi

NAME=$1
LOWER=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')
CAPITALIZED=$(echo "${NAME^}")

echo "🚀 Generando módulo CQRS completo: $CAPITALIZED..."

# Crear estructura de carpetas
mkdir -p src/$LOWER/{commands/handlers,queries/handlers,dto,entities,repositories}

# Crear DTO
cat > src/$LOWER/dto/create-${LOWER}.dto.ts <<EOF
export class Create${CAPITALIZED}Dto {
  readonly name: string;
}
EOF

# Crear entidad
cat > src/$LOWER/entities/${LOWER}.entity.ts <<EOF
export class ${CAPITALIZED} {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
}
EOF

# Crear repositorio
cat > src/$LOWER/repositories/${LOWER}.repository.ts <<EOF
import { ${CAPITALIZED} } from '../entities/${LOWER}.entity';
import { v4 as uuid } from 'uuid';

export class ${CAPITALIZED}Repository {
  private items: ${CAPITALIZED}[] = [];

  create(name: string): ${CAPITALIZED} {
    const item = new ${CAPITALIZED}(uuid(), name);
    this.items.push(item);
    return item;
  }

  findAll(): ${CAPITALIZED}[] {
    return this.items;
  }
}
EOF

# Comando y handler
cat > src/$LOWER/commands/handlers/create-${LOWER}.command.ts <<EOF
import { Create${CAPITALIZED}Dto } from '../../dto/create-${LOWER}.dto';

export class Create${CAPITALIZED}Command {
  constructor(public readonly dto: Create${CAPITALIZED}Dto) {}
}
EOF

cat > src/$LOWER/commands/handlers/create-${LOWER}.handler.ts <<EOF
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Create${CAPITALIZED}Command } from './create-${LOWER}.command';
import { ${CAPITALIZED}Repository } from '../../repositories/${LOWER}.repository';

@CommandHandler(Create${CAPITALIZED}Command)
export class Create${CAPITALIZED}Handler implements ICommandHandler<Create${CAPITALIZED}Command> {
  constructor(private readonly repo: ${CAPITALIZED}Repository) {}

    async execute(command: Create${CAPITALIZED}Command) {
    return this.repo.create(command.dto.name);
  }
}
EOF

# Query y handler
cat > src/$LOWER/queries/handlers/get-${LOWER}s.query.ts <<EOF
export class Get${CAPITALIZED}sQuery {}
EOF

cat > src/$LOWER/queries/handlers/get-${LOWER}s.handler.ts <<EOF
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Get${CAPITALIZED}sQuery } from './get-${LOWER}s.query';
import { ${CAPITALIZED}Repository } from '../../repositories/${LOWER}.repository';

@QueryHandler(Get${CAPITALIZED}sQuery)
export class Get${CAPITALIZED}sHandler implements IQueryHandler<Get${CAPITALIZED}sQuery> {
  constructor(private readonly repo: ${CAPITALIZED}Repository) {}

   execute() {
    return this.repo.findAll();
  }
}
EOF

# Controlador
cat > src/$LOWER/${LOWER}.controller.ts <<EOF
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Create${CAPITALIZED}Dto } from './dto/create-${LOWER}.dto';
import { Create${CAPITALIZED}Command } from './commands/handlers/create-${LOWER}.command';
import { Get${CAPITALIZED}sQuery } from './queries/handlers/get-${LOWER}s.query';

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

# Modulo
cat > src/$LOWER/${LOWER}.module.ts <<EOF
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ${CAPITALIZED}Controller } from './${LOWER}.controller';
import { ${CAPITALIZED}Repository } from './repositories/${LOWER}.repository';
import { Create${CAPITALIZED}Handler } from './commands/handlers/create-${LOWER}.handler';
import { Get${CAPITALIZED}sHandler } from './queries/handlers/get-${LOWER}s.handler';

@Module({
  imports: [CqrsModule],
  controllers: [${CAPITALIZED}Controller],
  providers: [
    ${CAPITALIZED}Repository,
    Create${CAPITALIZED}Handler,
    Get${CAPITALIZED}sHandler
  ],
})
export class ${CAPITALIZED}Module {}
EOF

echo "✅ Módulo $CAPITALIZED CQRS generado con éxito."
