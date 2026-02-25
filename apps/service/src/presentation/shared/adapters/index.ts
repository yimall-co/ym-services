/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QueryHandlers } from 'shared/infrastructure/query-bus/query-handlers';
import { InMemoryQueryBus } from 'shared/infrastructure/query-bus/in-memory.query-bus';
import { DrizzleClientFactory } from 'shared/infrastructure/persistence/drizzle/client-factory';

import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces.query-handler';

import { GET_WORKSPACES_QUERY_HANDLER } from 'presentation/workspace/adapters/workspace.adapter';

export const QUERY_HANDLERS = 'QUERY_HANDLERS';

export const queryHandlersProvider: Provider = {
    provide: QUERY_HANDLERS,
    inject: [GET_WORKSPACES_QUERY_HANDLER],
    useFactory: (getWorkspacesQueryHandler: GetWorkspacesQueryHandler) => {
        console.log('QUERY_HANDLERS CREATED');

        return new QueryHandlers([getWorkspacesQueryHandler]);
    },
    scope: Scope.DEFAULT,
};

export const QUERY_BUS = 'QUERY_BUS';

export const queryBusProvider: Provider = {
    provide: QUERY_BUS,
    inject: [QUERY_HANDLERS],
    useFactory: (handlers: QueryHandlers) => {
        console.log('QUERY_BUS CREATED');

        return new InMemoryQueryBus(handlers);
    },
    scope: Scope.DEFAULT,
};

export const DRIZZLE_INSTANCE = 'DRIZZLE_INSTANCE';

export const drizzleInstanceProvider: Provider = {
    provide: DRIZZLE_INSTANCE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const connection = configService.getOrThrow<string>('database.url');
        console.log('DRIZZLE_INSTANCE CREATED');

        const pool = DrizzleClientFactory.createPool({
            connectionString: connection,
        });

        return DrizzleClientFactory.createClient(pool);
    },
    scope: Scope.DEFAULT,
};
