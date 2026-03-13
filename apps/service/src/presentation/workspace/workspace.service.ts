import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import type { Response } from 'shared/domain/response';
import { WorkspaceDto } from 'wm/workspace/application/query/get-workspaces/get-workspaces.dto';
import { WorkspaceByIdDto } from 'wm/workspace/application/query/get-workspace-by-id/get-workspace-by-id.dto';
import { GetWorkspacesQuery } from 'wm/workspace/application/query/get-workspaces/get-workspaces.query';
import { GetWorkspaceByIdQuery } from 'wm/workspace/application/query/get-workspace-by-id/get-workspace-by-id.query';
import { CreateWorkspaceCommand } from 'wm/workspace/application/command/create/create-workspace.command';
import { UpdateWorkspaceCommand } from 'wm/workspace/application/command/update/update-workspace.command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { UpdateWorkspaceDto } from './dtos/update-workspace.dto';
import { GetCategoriesByWorkspaceIdQuery } from 'lm/category/application/query/get-categories-by-workspace-id/get-categories-by-workspace-id.query';
import { CategoryByWorkspaceIdDto } from 'lm/category/application/query/get-categories-by-workspace-id/get-categories-by-workspace-id.dto';

@Injectable()
export class WorkspaceService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getAllWorkspaces(top: number, skip: number) {
        const query = new GetWorkspacesQuery(top, skip);
        return await this.queryBus.ask<Array<WorkspaceDto>>(query);
    }

    async getWorkspaceById(id: string) {
        const query = new GetWorkspaceByIdQuery(id);
        return await this.queryBus.ask<WorkspaceByIdDto>(query);
    }

    async getStatistics(id: string) { }

    async getWorkspaceCategoriesById(id: string) {
        const query = new GetCategoriesByWorkspaceIdQuery(id);
        return await this.queryBus.ask<Array<CategoryByWorkspaceIdDto>>(query);
    }

    async createWorkspace(dto: CreateWorkspaceDto) {
        const { name, description, tin, segmentId, ownerId } = dto;

        const command = new CreateWorkspaceCommand(name, description, tin, segmentId, ownerId);
        return await this.commandBus.dispatch<CreateWorkspaceDto>(command);
    }

    async updateWorkspace(id: string, dto: UpdateWorkspaceDto) {
        const { name, description } = dto;

        const command = new UpdateWorkspaceCommand(id, name, description);
        return await this.commandBus.dispatch<Response>(command);
    }

    async deleteWorkspace() { }
}
