/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces.query-handler';
import { GetWorkspaceByIdQueryHandler } from 'wm/workspace/application/query/get-workspace-by-id.query-handler';
import { DrizzleWorkspaceRepository } from 'wm/workspace/infrastructure/persistence/drizzle-workspace.repository';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    WORKSPACE_REPOSITORY,
    GET_WORKSPACES_QUERY_HANDLER,
    GET_WORKSPACE_BY_ID_QUERY_HANDLER,
    CREATE_WORKSPACE_COMMAND_HANDLER,
} from './constants';
import { CreateWorkspaceCommandHandler } from 'wm/workspace/application/command/create-workspace.command-handler';

export const workspaceRepositoryProvider: Provider = {
    provide: WORKSPACE_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase) => new DrizzleWorkspaceRepository(database),
    scope: Scope.DEFAULT,
};

export const getWorkspacesQueryHandlerProvider: Provider = {
    provide: GET_WORKSPACES_QUERY_HANDLER,
    inject: [WORKSPACE_REPOSITORY],
    useFactory: (workspaceRepository: WorkspaceRepository) =>
        new GetWorkspacesQueryHandler(workspaceRepository),
    scope: Scope.DEFAULT,
};

export const getWorkspaceByIdQueryHandlerProvider: Provider = {
    provide: GET_WORKSPACE_BY_ID_QUERY_HANDLER,
    inject: [WORKSPACE_REPOSITORY],
    useFactory: (workspaceRepository: WorkspaceRepository) =>
        new GetWorkspaceByIdQueryHandler(workspaceRepository),
    scope: Scope.DEFAULT,
};

export const createWorkspaceCommandHandlerProvider: Provider = {
    provide: CREATE_WORKSPACE_COMMAND_HANDLER,
    inject: [WORKSPACE_REPOSITORY],
    useFactory: (workspaceRepository: WorkspaceRepository) =>
        new CreateWorkspaceCommandHandler(workspaceRepository),
    scope: Scope.DEFAULT,
};
