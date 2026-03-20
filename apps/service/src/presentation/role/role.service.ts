import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CreateRoleCommand } from 'iam/role/application/command/create-role/command';
import { CreateRoleResultDto } from 'iam/role/application/command/create-role/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async createRole(dto: CreateRoleDto) {
        const command = new CreateRoleCommand(
            dto.name,
            dto.codeName,
            dto.description,
            dto.permissions,
        );

        return await this.commandBus.dispatch<CreateRoleResultDto>(command);
    }

    async updateRole() { }

    async addPermissionToRole() { }
}
