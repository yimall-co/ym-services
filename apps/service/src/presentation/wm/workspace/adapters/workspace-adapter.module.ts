import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleGeolocationUnitOfWork } from 'vm/geolocation/infrastructure/persistence/drizzle-geolocation.uow';
import { DrizzleWorkspaceUnitOfWork } from 'wm/workspace/infrastructure/persistence/drizzle-workspace.uow';
import { DrizzleWorkspaceRepository } from 'wm/workspace/infrastructure/persistence/drizzle-workspace.repository';
import { DrizzleWorkspaceQueryRepository } from 'wm/workspace/infrastructure/persistence/drizzle-workspace-query.repository';
import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces/handler';
import { GetWorkspaceByIdQueryHandler } from 'wm/workspace/application/query/get-workspace-by-id/handler';
import { GetGeolocationsByWorkspaceQueryHandler } from 'vm/geolocation/application/query/get-geolocations-by-workspace/handler';
import { CreateWorkspaceCommandHandler } from 'wm/workspace/application/command/create-workspace/handler';
import { UpdateWorkspaceCommandHandler } from 'wm/workspace/application/command/update-workspace/handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CREATE_WORKSPACE_COMMAND_HANDLER,
    GEOLOCATION_UNIT_OF_WORK, // TODO: REMOVE THIS FROM HERE.
    GET_GEOLOCATIONS_BY_WORKSPACE_QUERY_HANDLER,
    GET_WORKSPACE_BY_ID_QUERY_HANDLER,
    GET_WORKSPACES_QUERY_HANDLER,
    UPDATE_WORKSPACE_COMMAND_HANDLER,
    WORKSPACE_QUERY_REPOSITORY,
    WORKSPACE_REPOSITORY,
    WORKSPACE_UNIT_OF_WORK,
} from './constants';

@Module({
    providers: [
        {
            provide: GEOLOCATION_UNIT_OF_WORK,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleGeolocationUnitOfWork(db),
            scope: Scope.REQUEST,
        },

        {
            provide: WORKSPACE_UNIT_OF_WORK,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleWorkspaceUnitOfWork(db),
            scope: Scope.REQUEST,
        },

        {
            provide: WORKSPACE_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleWorkspaceRepository(db),
            scope: Scope.REQUEST,
        },

        {
            provide: WORKSPACE_QUERY_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleWorkspaceQueryRepository(db),
            scope: Scope.REQUEST,
        },

        {
            provide: GET_WORKSPACES_QUERY_HANDLER,
            inject: [WORKSPACE_QUERY_REPOSITORY],
            useFactory: (workspaceQueryRepository: DrizzleWorkspaceQueryRepository) =>
                new GetWorkspacesQueryHandler(workspaceQueryRepository),
            scope: Scope.REQUEST,
        },

        {
            provide: GET_WORKSPACE_BY_ID_QUERY_HANDLER,
            inject: [WORKSPACE_QUERY_REPOSITORY],
            useFactory: (workspaceQueryRepository: DrizzleWorkspaceQueryRepository) =>
                new GetWorkspaceByIdQueryHandler(workspaceQueryRepository),
            scope: Scope.REQUEST,
        },

        {
            provide: GET_GEOLOCATIONS_BY_WORKSPACE_QUERY_HANDLER,
            inject: [GEOLOCATION_UNIT_OF_WORK],
            useFactory: (geolocationUnitOfWork: DrizzleGeolocationUnitOfWork) =>
                new GetGeolocationsByWorkspaceQueryHandler(geolocationUnitOfWork),
            scope: Scope.DEFAULT,
        },

        {
            provide: CREATE_WORKSPACE_COMMAND_HANDLER,
            inject: [WORKSPACE_UNIT_OF_WORK],
            useFactory: (workspaceUnitOfWork: DrizzleWorkspaceUnitOfWork) =>
                new CreateWorkspaceCommandHandler(workspaceUnitOfWork),
            scope: Scope.REQUEST,
        },

        {
            provide: UPDATE_WORKSPACE_COMMAND_HANDLER,
            inject: [WORKSPACE_UNIT_OF_WORK],
            useFactory: (workspaceUnitOfWork: DrizzleWorkspaceUnitOfWork) =>
                new UpdateWorkspaceCommandHandler(workspaceUnitOfWork),
            scope: Scope.REQUEST,
        },
    ],
    exports: [
        CREATE_WORKSPACE_COMMAND_HANDLER,
        GEOLOCATION_UNIT_OF_WORK,
        GET_GEOLOCATIONS_BY_WORKSPACE_QUERY_HANDLER,
        GET_WORKSPACE_BY_ID_QUERY_HANDLER,
        GET_WORKSPACES_QUERY_HANDLER,
        UPDATE_WORKSPACE_COMMAND_HANDLER,
        WORKSPACE_QUERY_REPOSITORY,
        WORKSPACE_REPOSITORY,
        WORKSPACE_UNIT_OF_WORK,
    ],
})
export class WorkspaceAdapterModule { }
