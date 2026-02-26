/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QueryHandlers } from 'shared/infrastructure/query-bus/query-handlers';
import { InMemoryQueryBus } from 'shared/infrastructure/query-bus/in-memory.query-bus';
import { CommandHandlers } from 'shared/infrastructure/command-bus/command-handlers';
import { InMemoryCommandBus } from 'shared/infrastructure/command-bus/in-memory.command-bus';
import { DrizzleClientFactory } from 'shared/infrastructure/persistence/drizzle/client-factory';
import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces.query-handler';
import { GetWorkspaceByIdQueryHandler } from 'wm/workspace/application/query/get-workspace-by-id.query-handler';
import { CreateWorkspaceCommandHandler } from 'wm/workspace/application/command/create-workspace.command-handler';

import {
    CREATE_WORKSPACE_COMMAND_HANDLER,
    GET_WORKSPACES_QUERY_HANDLER,
    GET_WORKSPACE_BY_ID_QUERY_HANDLER,
} from 'presentation/workspace/adapters/constants';

import {
    COMMAND_BUS,
    COMMAND_HANDLERS,
    DRIZZLE_INSTANCE,
    QUERY_BUS,
    QUERY_HANDLERS,
} from './constants';

export const queryHandlersProvider: Provider = {
    provide: QUERY_HANDLERS,
    inject: [GET_WORKSPACES_QUERY_HANDLER, GET_WORKSPACE_BY_ID_QUERY_HANDLER],
    useFactory: (
        getWorkspacesQueryHandler: GetWorkspacesQueryHandler,
        getWorkspaceByIdQueryHandler: GetWorkspaceByIdQueryHandler,
    ) => new QueryHandlers([getWorkspacesQueryHandler, getWorkspaceByIdQueryHandler]),
    scope: Scope.DEFAULT,
};

export const queryBusProvider: Provider = {
    provide: QUERY_BUS,
    inject: [QUERY_HANDLERS],
    useFactory: (handlers: QueryHandlers) => {
        console.log('QUERY_BUS CREATED');
        return new InMemoryQueryBus(handlers);
    },
    scope: Scope.DEFAULT,
};

export const commandHandlersProvider: Provider = {
    provide: COMMAND_HANDLERS,
    inject: [CREATE_WORKSPACE_COMMAND_HANDLER],
    useFactory: (createWorkspaceCommandHandler: CreateWorkspaceCommandHandler) =>
        new CommandHandlers([createWorkspaceCommandHandler]),
    scope: Scope.DEFAULT,
};

export const commandBusProvider: Provider = {
    provide: COMMAND_BUS,
    inject: [COMMAND_HANDLERS],
    useFactory: (handlers: CommandHandlers) => new InMemoryCommandBus(handlers),
    scope: Scope.DEFAULT,
};

export const drizzleInstanceProvider: Provider = {
    provide: DRIZZLE_INSTANCE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const connection = configService.getOrThrow<string>('database.url');
        const pool = DrizzleClientFactory.createPool({
            connectionString: connection,
        });

        return DrizzleClientFactory.createClient(pool);
    },
    scope: Scope.DEFAULT,
};
