/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { AddRoleToUserCommand } from 'iam/user/application/command/add-role-to-user/command';
import { AddRoleToUserResultDto } from 'iam/user/application/command/add-role-to-user/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { AddRoleToUserDto } from './dtos/add-role-to-user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async addRoleToUser(userId: string, dto: AddRoleToUserDto) {
        const command = new AddRoleToUserCommand(userId, dto.roleId);
        return await this.commandBus.dispatch<AddRoleToUserResultDto>(command);
    }
}
