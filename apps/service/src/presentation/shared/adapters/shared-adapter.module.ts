import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QueryHandler } from 'shared/domain/query-handler';
import { CommandHandler } from 'shared/domain/command-handler';
import { QueryHandlers } from 'shared/infrastructure/query-bus/query-handlers';
import { CommandHandlers } from 'shared/infrastructure/command-bus/command-handlers';
import { InMemoryQueryBus } from 'shared/infrastructure/query-bus/in-memory.query-bus';
import { EventSubscribers } from 'shared/infrastructure/event-bus/event-subscribers';
import { InMemoryEventBus } from 'shared/infrastructure/event-bus/in-memory.event-bus';
import { InMemoryCommandBus } from 'shared/infrastructure/command-bus/in-memory.command-bus';
import { DrizzleClientFactory } from 'shared/infrastructure/persistence/drizzle/client-factory';

import {
    CREATE_WORKSPACE_COMMAND_HANDLER,
    GET_GEOLOCATIONS_BY_WORKSPACE_QUERY_HANDLER,
    GET_WORKSPACE_BY_ID_QUERY_HANDLER,
    GET_WORKSPACES_QUERY_HANDLER,
} from 'presentation/wm/workspace/adapters/constants';
import {
    CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    CREATE_CUSTOMIZATION_COMMAND_HANDLER,
    GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
} from 'presentation/wm/customization/adapters/constants';
import {
    ADD_ROLE_TO_USER_COMMAND_HANDLER,
    GET_USER_BY_ID_QUERY_HANDLER,
    GET_USER_INFO_BY_ID_QUERY_HANDLER,
    GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
} from 'presentation/iam/user/adapters/constants';
import {
    CREATE_CATEGORY_COMMAND_HANDLER,
    GET_CATEGORIES_BY_WORKSPACE_ID_QUERY_HANDLER,
    GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
} from 'presentation/vm/category/adapters/constants';
import {
    CREATE_SHOP_COMMAND_HANDLER,
    GET_SHOP_BY_SLUG_QUERY_HANDLER,
    GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
} from 'presentation/vm/shop/adapters/constants';
import {
    CREATE_OFFER_COMMAND_HANDLER,
    GET_OFFERS_BY_SHOP_QUERY_HANDLER,
    GET_OFFERS_BY_WORKSPACE_QUERY_HANDLER,
} from 'presentation/vm/offer/adapters/constants';
import {
    CREATE_SEGMENT_COMMAND_HANDLER,
    GET_SEGMENTS_BY_CRITERIA_QUERY_HANDLER,
} from 'presentation/wm/segment/adapters/constants';
import {
    ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
    CREATE_ROLE_COMMAND_HANDLER,
    UPDATE_ROLE_COMMAND_HANDLER,
} from 'presentation/iam/role/adapters/constants';
import { CREATE_PERMISSION_COMMAND_HANDLER } from 'presentation/iam/permission/adapters/constants';
import { CREATE_VISIT_COMMAND_HANDLER } from 'presentation/wm/tracking/adapters/constants';
import { LIKE_COMMAND_HANDLER } from 'presentation/socm/reaction/adapters/constants';
import { COMMENTATE_ON_COMMAND_HANDLER } from 'presentation/socm/comment/adapters/constants';

import {
    COMMAND_BUS,
    COMMAND_HANDLERS,
    DRIZZLE_INSTANCE,
    EVENT_BUS,
    EVENT_SUBSCRIBERS,
    QUERY_BUS,
    QUERY_HANDLERS,
} from './constants';

@Module({
    imports: [],
    providers: [
        {
            provide: DRIZZLE_INSTANCE,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const connection = configService.getOrThrow<string>('database.url');
                const nodeEnv = configService.getOrThrow<string>('app.nodeEnv');

                const pool = DrizzleClientFactory.createPool({
                    connectionString: connection,
                    ...(nodeEnv !== 'local' && {
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    }),
                    max: 10,
                    min: 2,
                    idleTimeoutMillis: 25000,
                    connectionTimeoutMillis: 2500,
                });

                return DrizzleClientFactory.createClient(pool);
            },
            scope: Scope.DEFAULT,
        },
        {
            provide: EVENT_SUBSCRIBERS,
            inject: [],
            useFactory: () => new EventSubscribers([]),
            scope: Scope.DEFAULT,
        },
        {
            provide: EVENT_BUS,
            inject: [EVENT_SUBSCRIBERS],
            useFactory: (subscribers: EventSubscribers) => new InMemoryEventBus(subscribers),
            scope: Scope.DEFAULT,
        },
        {
            provide: QUERY_HANDLERS,
            inject: [
                GET_WORKSPACES_QUERY_HANDLER,
                GET_WORKSPACE_BY_ID_QUERY_HANDLER,
                GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
                GET_USER_BY_ID_QUERY_HANDLER,
                GET_USER_INFO_BY_ID_QUERY_HANDLER,
                GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
                GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
                GET_SHOP_BY_SLUG_QUERY_HANDLER,
                GET_OFFERS_BY_SHOP_QUERY_HANDLER,
                GET_OFFERS_BY_WORKSPACE_QUERY_HANDLER,
                GET_SEGMENTS_BY_CRITERIA_QUERY_HANDLER,
                GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
                GET_GEOLOCATIONS_BY_WORKSPACE_QUERY_HANDLER,
                GET_CATEGORIES_BY_WORKSPACE_ID_QUERY_HANDLER,
            ],
            useFactory: (...handlers: Array<QueryHandler<any, any>>) => new QueryHandlers(handlers),
            scope: Scope.DEFAULT,
        },
        {
            provide: QUERY_BUS,
            inject: [QUERY_HANDLERS],
            useFactory: (handlers: QueryHandlers) => new InMemoryQueryBus(handlers),
            scope: Scope.DEFAULT,
        },
        {
            provide: COMMAND_HANDLERS,
            inject: [
                CREATE_WORKSPACE_COMMAND_HANDLER,
                CREATE_SEGMENT_COMMAND_HANDLER,
                CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
                CREATE_OFFER_COMMAND_HANDLER,
                CREATE_ROLE_COMMAND_HANDLER,
                UPDATE_ROLE_COMMAND_HANDLER,
                ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
                CREATE_PERMISSION_COMMAND_HANDLER,
                ADD_ROLE_TO_USER_COMMAND_HANDLER,
                CREATE_CUSTOMIZATION_COMMAND_HANDLER,
                CREATE_VISIT_COMMAND_HANDLER,
                CREATE_SHOP_COMMAND_HANDLER,
                CREATE_CATEGORY_COMMAND_HANDLER,
                LIKE_COMMAND_HANDLER,
                COMMENTATE_ON_COMMAND_HANDLER,
            ],
            useFactory: (...handlers: Array<CommandHandler<any, any>>) =>
                new CommandHandlers(handlers),
            scope: Scope.DEFAULT,
        },
        {
            provide: COMMAND_BUS,
            inject: [COMMAND_HANDLERS],
            useFactory: (handlers: CommandHandlers) => new InMemoryCommandBus(handlers),
            scope: Scope.DEFAULT,
        },
    ],
    exports: [
        DRIZZLE_INSTANCE,
        EVENT_BUS,
        EVENT_SUBSCRIBERS,
        QUERY_BUS,
        QUERY_HANDLERS,
        COMMAND_BUS,
        COMMAND_HANDLERS,
    ],
})
export class SharedAdapterModule { }
