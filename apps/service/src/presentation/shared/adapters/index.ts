/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { Provider, Scope } from '@nestjs/common';

import { QueryHandlers } from 'shared/infrastructure/query-bus/query-handlers';
import { InMemoryQueryBus } from 'shared/infrastructure/query-bus/in-memory.query-bus';
import { CommandHandlers } from 'shared/infrastructure/command-bus/command-handlers';
import { InMemoryCommandBus } from 'shared/infrastructure/command-bus/in-memory.command-bus';
import { DrizzleClientFactory } from 'shared/infrastructure/persistence/drizzle/client-factory';
import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces/get-workspaces.query-handler';
import { GetWorkspaceByIdQueryHandler } from 'wm/workspace/application/query/get-workspace-by-id/get-workspace-by-id.query-handler';
import { CreateWorkspaceCommandHandler } from 'wm/workspace/application/command/create/create-workspace.command-handler';
import { CreateSegmentCommandHandler } from 'wm/segment/application/command/create/create-segment.command-handler';
import { GetCustomizationByWorkspaceQueryHandler } from 'wm/customization/application/query/get-customization-by-workspace/get-customization-by-workspace.query-handler';
import { CreateCustomizationColorCommandHandler } from 'wm/customization-color/application/command/create/create-customization-color.command-handler';
import { GetUserByEmailQueryHandler } from 'iam/user/application/query/get-user-by-email/get-user-by-email.query-handler';
import { CreateUserCommandHandler } from 'iam/user/application/command/create/create-user.command-handler';
import { CreateAccountCommandHandler } from 'iam/account/application/command/create/create-account.command-handler';
import { GetCategoryBySlugQueryHandler } from 'lm/category/application/query/get-category-by-slug/get-category-by-slug.query-handler';
import { GetShopsByWorkspaceQueryHandler } from 'vm/shop/application/query/get-shops-by-workspace/get-shops-by-workspace.query-handler';
import { GetShopBySlugQueryHandler } from 'vm/shop/application/query/get-shop-by-slug/get-shop-by-slug.query-handler';

import {
    CREATE_WORKSPACE_COMMAND_HANDLER,
    GET_WORKSPACES_QUERY_HANDLER,
    GET_WORKSPACE_BY_ID_QUERY_HANDLER,
} from 'presentation/workspace/adapters/constants';
import { CREATE_SEGMENT_COMMAND_HANDLER } from 'presentation/segment/adapters/constants';
import {
    CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
} from 'presentation/customization/adapters/constants';
import {
    CREATE_ACCOUNT_COMMAND_HANDLER,
    CREATE_USER_COMMAND_HANDLER,
    GET_USER_BY_EMAIl_QUERY_HANDLER,
} from 'presentation/auth/adapters/constants';
import { GET_CATEGORY_BY_SLUG_QUERY_HANDLER } from 'presentation/category/adapters/constants';
import {
    GET_SHOP_BY_SLUG_QUERY_HANDLER,
    GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
} from 'presentation/shop/adapters/constants';

import {
    COMMAND_BUS,
    COMMAND_HANDLERS,
    DRIZZLE_INSTANCE,
    QUERY_BUS,
    QUERY_HANDLERS,
} from './constants';

export const queryHandlersProvider: Provider = {
    provide: QUERY_HANDLERS,
    inject: [
        GET_WORKSPACES_QUERY_HANDLER,
        GET_WORKSPACE_BY_ID_QUERY_HANDLER,
        GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
        GET_USER_BY_EMAIl_QUERY_HANDLER,
        GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
        GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
        GET_SHOP_BY_SLUG_QUERY_HANDLER,
    ],
    useFactory: (
        getWorkspacesQueryHandler: GetWorkspacesQueryHandler,
        getWorkspaceByIdQueryHandler: GetWorkspaceByIdQueryHandler,
        getCustomizationByWorkspaceQueryHandler: GetCustomizationByWorkspaceQueryHandler,
        getUserByEmailQueryHandler: GetUserByEmailQueryHandler,
        getCategoryBySlugQueryHandler: GetCategoryBySlugQueryHandler,
        getShopsByWorkspaceQueryHandler: GetShopsByWorkspaceQueryHandler,
        getShopBySlugQueryHandler: GetShopBySlugQueryHandler,
    ) =>
        new QueryHandlers([
            getWorkspacesQueryHandler,
            getWorkspaceByIdQueryHandler,
            getCustomizationByWorkspaceQueryHandler,
            getUserByEmailQueryHandler,
            getCategoryBySlugQueryHandler,
            getShopsByWorkspaceQueryHandler,
            getShopBySlugQueryHandler,
        ]),
    scope: Scope.DEFAULT,
};

export const queryBusProvider: Provider = {
    provide: QUERY_BUS,
    inject: [QUERY_HANDLERS],
    useFactory: (handlers: QueryHandlers) => new InMemoryQueryBus(handlers),
    scope: Scope.DEFAULT,
};

export const commandHandlersProvider: Provider = {
    provide: COMMAND_HANDLERS,
    inject: [
        CREATE_WORKSPACE_COMMAND_HANDLER,
        CREATE_SEGMENT_COMMAND_HANDLER,
        CREATE_USER_COMMAND_HANDLER,
        CREATE_ACCOUNT_COMMAND_HANDLER,
        CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    ],
    useFactory: (
        createWorkspaceCommandHandler: CreateWorkspaceCommandHandler,
        createSegmentCommandHandler: CreateSegmentCommandHandler,
        createUserCommandHandler: CreateUserCommandHandler,
        createAccountCommandHandler: CreateAccountCommandHandler,
        createCustomizationColorCommandHandler: CreateCustomizationColorCommandHandler,
    ) =>
        new CommandHandlers([
            createWorkspaceCommandHandler,
            createSegmentCommandHandler,
            createUserCommandHandler,
            createAccountCommandHandler,
            createCustomizationColorCommandHandler,
        ]),
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
