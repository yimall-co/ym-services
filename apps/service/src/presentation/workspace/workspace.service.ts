import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { WorkspaceResult } from 'wm/workspace/application/workspace-result';
import { WorkspacesResult } from 'wm/workspace/application/workspaces-result';
import { GetWorkspacesQuery } from 'wm/workspace/application/query/get-workspaces/get-workspaces.query';
import { GetWorkspaceByIdQuery } from 'wm/workspace/application/query/get-workspace-by-id/get-workspace-by-id.query';
import { CreateWorkspaceCommand } from 'wm/workspace/application/command/create/create-workspace.command';
import { UpdateWorkspaceCommand } from 'wm/workspace/application/command/update/update-workspace.command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

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

    async getAllWorkspaces(top: number, skip: number) {
        const query = new GetWorkspacesQuery(top, skip);

        const result = await this.queryBus.ask<WorkspacesResult>(query);
        return result.workspaces.map((w) => ({ ...w }));
    }

    async getOneWorkspace(id: string) {
        const query = new GetWorkspaceByIdQuery(id);

        const result = await this.queryBus.ask<WorkspaceResult>(query);
        return { ...result };
    }

    async createWorkspace(dto: CreateWorkspaceDto) {
        const { name, description, tin, segmentId, ownerId } = dto;

        const command = new CreateWorkspaceCommand(name, description, tin, segmentId, ownerId);

        await this.commandBus.dispatch(command);
    }

    async updateWorkspace(id: string, dto: UpdateWorkspaceDto) {
        const { name, description } = dto;

        const command = new UpdateWorkspaceCommand(id, name, description);
        await this.commandBus.dispatch(command);
    }

    async deleteWorkspace() { }
}
