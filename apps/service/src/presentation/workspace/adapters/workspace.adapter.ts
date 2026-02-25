/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces.query-handler';
import { DrizzleWorkspaceRepository } from 'wm/workspace/infrastructure/persistence/drizzle-workspace.repository';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters';

export const WORKSPACE_REPOSITORY = Symbol('WORKSPACE_REPOSITORY');

export const workspaceRepositoryProvider: Provider = {
    provide: WORKSPACE_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase) => {
        console.log('WORKSPACE_REPOSITORY CREATED');
        return new DrizzleWorkspaceRepository(database);
    },
    scope: Scope.DEFAULT,
};

export const GET_WORKSPACES_QUERY_HANDLER = Symbol('GET_WORKSPACES_QUERY_HANDLER');

export const getWorkspacesQueryHandlerProvider: Provider = {
    provide: GET_WORKSPACES_QUERY_HANDLER,
    inject: [WORKSPACE_REPOSITORY],
    useFactory: (workspaceRepository: WorkspaceRepository) => {
        console.log('GET_WORKSPACES_QUERY_HANDLER CREATED');
        return new GetWorkspacesQueryHandler(workspaceRepository);
    },
    scope: Scope.DEFAULT,
};
