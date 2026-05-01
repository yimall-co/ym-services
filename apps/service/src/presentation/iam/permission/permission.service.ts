import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CreatePermissionCommand } from 'iam/permission/application/command/create-permission/command';
import { CreatePermissionResultDto } from 'iam/permission/application/command/create-permission/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreatePermissionDto } from './dtos/create-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async createPermission(dto: CreatePermissionDto) {
        const command = new CreatePermissionCommand(
            dto.name,
            dto.codeName,
            dto.description,
            dto.isActive,
        );

        return this.commandBus.dispatch<CreatePermissionResultDto>(command);
    }
}
