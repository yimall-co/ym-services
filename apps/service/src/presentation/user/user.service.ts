/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { AddRoleToUserResultDto } from 'iam/user/application/command/add-role-to-user/dto';
import { AddRoleToUserCommand } from 'iam/user/application/command/add-role-to-user/command';
import { UserByIdDto } from 'iam/user/application/query/get-user-by-id/dto';
import { GetUserByIdQuery } from 'iam/user/application/query/get-user-by-id/query';
import { UserInfoByIdDto } from 'iam/user/application/query/get-user-info-by-id/dto';
import { GetUserInfoByIdQuery } from 'iam/user/application/query/get-user-info-by-id/query';
import { WorkspaceByUserDto } from 'wm/workspace/application/query/get-workspaces-by-user-id/dto';
import { GetWorkspacesByUserIdQuery } from 'wm/workspace/application/query/get-workspaces-by-user-id/query';

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

    async getOwnUser(userId: string) {
        const query = new GetUserByIdQuery(userId);
        return await this.queryBus.ask<UserByIdDto>(query);
    }

    async getUserInfoById(userId: string) {
        const query = new GetUserInfoByIdQuery(userId);
        return await this.queryBus.ask<UserInfoByIdDto>(query);
    }

    async getOwnWorkspaces(ownerId: string) {
        // TODO: change this query name for GetWorkspacesByOwnerIdQuery;
        const query = new GetWorkspacesByUserIdQuery(ownerId);
        return await this.queryBus.ask<Array<WorkspaceByUserDto>>(query);
    }

    async addRoleToUser(userId: string, dto: AddRoleToUserDto) {
        const command = new AddRoleToUserCommand(userId, dto.roleId);
        return await this.commandBus.dispatch<AddRoleToUserResultDto>(command);
    }
}
