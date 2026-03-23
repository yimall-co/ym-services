import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces/handler';
import { GetWorkspaceByIdQueryHandler } from 'wm/workspace/application/query/get-workspace-by-id/handler';
import { WorkspaceQueryRepository } from 'wm/workspace/application/query/workspace-query.repository';
import { DrizzleWorkspaceRepository } from 'wm/workspace/infrastructure/persistence/drizzle-workspace.repository';
import { CreateWorkspaceCommandHandler } from 'wm/workspace/application/command/create-workspace/handler';
import { UpdateWorkspaceCommandHandler } from 'wm/workspace/application/command/update-workspace/handler';
import { DrizzleWorkspaceQueryRepository } from 'wm/workspace/infrastructure/persistence/drizzle-workspace-query.repository';
import { DrizzleWorkspaceUnitOfWork } from 'wm/workspace/infrastructure/persistence/drizzle-workspace.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    WORKSPACE_REPOSITORY,
    GET_WORKSPACES_QUERY_HANDLER,
    GET_WORKSPACE_BY_ID_QUERY_HANDLER,
    CREATE_WORKSPACE_COMMAND_HANDLER,
    UPDATE_WORKSPACE_COMMAND_HANDLER,
    WORKSPACE_QUERY_REPOSITORY,
    WORKSPACE_UNIT_OF_WORK,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const workspaceUnitOfWorkProvider: Provider = {
    provide: WORKSPACE_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleWorkspaceUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const workspaceRepositoryProvider: Provider = {
    provide: WORKSPACE_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleWorkspaceRepository(database),
    scope: Scope.DEFAULT,
};

export const workspaceQueryRepositoryProvider: Provider = {
    provide: WORKSPACE_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleWorkspaceQueryRepository(database),
    scope: Scope.DEFAULT,
};

export const getWorkspacesQueryHandlerProvider: Provider = {
    provide: GET_WORKSPACES_QUERY_HANDLER,
    inject: [WORKSPACE_UNIT_OF_WORK],
    useFactory: (workspaceUnitOfWork: DrizzleWorkspaceUnitOfWork) =>
        new GetWorkspacesQueryHandler(workspaceUnitOfWork),
    scope: Scope.REQUEST,
};

export const getWorkspaceByIdQueryHandlerProvider: Provider = {
    provide: GET_WORKSPACE_BY_ID_QUERY_HANDLER,
    inject: [WORKSPACE_QUERY_REPOSITORY],
    useFactory: (workspaceQueryRepository: WorkspaceQueryRepository) =>
        new GetWorkspaceByIdQueryHandler(workspaceQueryRepository),
    scope: Scope.DEFAULT,
};

export const createWorkspaceCommandHandlerProvider: Provider = {
    provide: CREATE_WORKSPACE_COMMAND_HANDLER,
    inject: [WORKSPACE_UNIT_OF_WORK],
    useFactory: (workspaceUnitOfWork: DrizzleWorkspaceUnitOfWork) =>
        new CreateWorkspaceCommandHandler(workspaceUnitOfWork),
    scope: Scope.REQUEST,
};

export const updateWorkspaceCommandHandlerProvider: Provider = {
    provide: UPDATE_WORKSPACE_COMMAND_HANDLER,
    inject: [WORKSPACE_UNIT_OF_WORK],
    useFactory: (workspaceUnitOfWork: DrizzleWorkspaceUnitOfWork) =>
        new UpdateWorkspaceCommandHandler(workspaceUnitOfWork),
    scope: Scope.REQUEST,
};
