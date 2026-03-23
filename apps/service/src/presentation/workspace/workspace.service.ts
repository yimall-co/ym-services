import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { WorkspaceDto } from 'wm/workspace/application/query/get-workspaces/dto';
import { WorkspaceByIdDto } from 'wm/workspace/application/query/get-workspace-by-id/dto';
import { UpdateWorkspaceResultDto } from 'wm/workspace/application/command/update-workspace/dto';
import { CreateWorkspaceResultDto } from 'wm/workspace/application/command/create-workspace/dto';
import { PaginatedWorkspace } from 'wm/workspace/application/query/workspace-query.repository';
import { GetWorkspacesQuery } from 'wm/workspace/application/query/get-workspaces/query';
import { GetWorkspaceByIdQuery } from 'wm/workspace/application/query/get-workspace-by-id/query';
import { CreateWorkspaceCommand } from 'wm/workspace/application/command/create-workspace/command';
import { UpdateWorkspaceCommand } from 'wm/workspace/application/command/update-workspace/command';
import { GetCategoriesByWorkspaceIdQuery } from 'lm/category/application/query/get-categories-by-workspace-id/query';
import { CategoryByWorkspaceIdDto } from 'lm/category/application/query/get-categories-by-workspace-id/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { GetWorkspacesDto } from './dtos/get-workspaces.dto';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { UpdateWorkspaceDto } from './dtos/update-workspace.dto';

@Injectable()
export class WorkspaceService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getAllWorkspaces(dto: GetWorkspacesDto) {
        const { id, updatedAt, limit } = dto;

        const query = new GetWorkspacesQuery(
            id,
            updatedAt ? new Date(updatedAt) : undefined,
            limit,
        );

        return await this.queryBus.ask<PaginatedWorkspace<WorkspaceDto>>(query);
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

        const command = new CreateWorkspaceCommand(
            name,
            description,
            tin ?? null,
            segmentId,
            ownerId,
        );
        return await this.commandBus.dispatch<CreateWorkspaceResultDto>(command);
    }

    async updateWorkspace(id: string, dto: UpdateWorkspaceDto) {
        const { name, description } = dto;

        const command = new UpdateWorkspaceCommand(id, name, description);
        return await this.commandBus.dispatch<UpdateWorkspaceResultDto>(command);
    }

    async deleteWorkspace() { }
}
