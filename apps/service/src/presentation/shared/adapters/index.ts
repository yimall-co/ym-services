import { ConfigService } from '@nestjs/config';
import { Provider, Scope } from '@nestjs/common';

// import { EventBus } from 'shared/domain/event-bus';
import { QueryHandlers } from 'shared/infrastructure/query-bus/query-handlers';
import { InMemoryQueryBus } from 'shared/infrastructure/query-bus/in-memory.query-bus';
import { CommandHandlers } from 'shared/infrastructure/command-bus/command-handlers';
import { InMemoryCommandBus } from 'shared/infrastructure/command-bus/in-memory.command-bus';
import { InMemoryEventBus } from 'shared/infrastructure/event-bus/in-memory.event-bus';
import { EventSubscribers } from 'shared/infrastructure/event-bus/event-subscribers';
import { DrizzleClientFactory } from 'shared/infrastructure/persistence/drizzle/client-factory';
import { GetWorkspacesQueryHandler } from 'wm/workspace/application/query/get-workspaces/handler';
import { GetWorkspaceByIdQueryHandler } from 'wm/workspace/application/query/get-workspace-by-id/handler';
import { CreateWorkspaceCommandHandler } from 'wm/workspace/application/command/create-workspace/handler';
import { CreateSegmentCommandHandler } from 'wm/segment/application/command/create-segment/handler';
import { GetSegmentsByCriteriaQueryHandler } from 'wm/segment/application/query/get-segments-by-criteria/handler';
import { GetCustomizationByWorkspaceQueryHandler } from 'wm/customization/application/query/get-customization-by-workspace/handler';
import { CreateCustomizationColorCommandHandler } from 'wm/customization-color/application/command/create-customization-color/handler';
import { GetUserByIdQueryHandler } from 'iam/user/application/query/get-user-by-id/handler';
import { GetUserInfoByIdQueryHandler } from 'iam/user/application/query/get-user-info-by-id/handler';
import { GetUserByEmailQueryHandler } from 'iam/user/application/query/get-user-by-email/handler';
import { CreateUserCommandHandler } from 'iam/user/application/command/create-user/handler';
import { CreateAccountCommandHandler } from 'iam/account/application/command/create/create-account.command-handler';
import { GetCategoryBySlugQueryHandler } from 'lm/category/application/query/get-category-by-slug/handler';
import { GetShopsByWorkspaceQueryHandler } from 'vm/shop/application/query/get-shops-by-workspace/handler';
import { GetShopBySlugQueryHandler } from 'vm/shop/application/query/get-shop-by-slug/handler';
import { GetOffersByShopQueryHandler } from 'vm/offer/application/query/get-offers-by-shop/handler';
import { CreateOfferCommandHandler } from 'vm/offer/application/command/create-offer/handler';
import { CreateRoleCommandHandler } from 'iam/role/application/command/create-role/handler';
import { UpdateRoleCommandHandler } from 'iam/role/application/command/update-role/handler';
import { AddPermissionToRoleCommandHandler } from 'iam/role/application/command/add-permission-to-role/handler';
import { CreatePermissionCommandHandler } from 'iam/permission/application/command/create-permission/handler';
import { AddRoleToUserCommandHandler } from 'iam/user/application/command/add-role-to-user/handler';
import { CreateProfileCommandHandler } from 'iam/profiles/application/command/create-profile/handler';
import { GetWorkspacesByUserIdQueryHandler } from 'wm/workspace/application/query/get-workspaces-by-user-id/handler';
import { CreateCustomizationCommandHandler } from 'wm/customization/application/command/create-customization/handler';
import { CreateVisitCommandHandler } from 'wm/visit/application/command/create-visit/handler';
import { CreateShopCommandHandler } from 'vm/shop/application/command/create-shop/handler';
import { GetGeolocationsByWorkspaceQueryHandler } from 'vm/geolocation/application/query/get-geolocations-by-workspace/handler';
import { GetCategoriesByWorkspaceIdQueryHandler } from 'lm/category/application/query/get-categories-by-workspace-id/handler';
import { CreateCategoryCommandHandler } from 'lm/category/application/command/create-category/handler';

import {
    CREATE_WORKSPACE_COMMAND_HANDLER,
    GET_GEOLOCATIONS_BY_WORKSPACE_QUERY_HANDLER,
    GET_WORKSPACES_QUERY_HANDLER,
    GET_WORKSPACE_BY_ID_QUERY_HANDLER,
} from 'presentation/workspace/adapters/constants';
import {
    CREATE_SEGMENT_COMMAND_HANDLER,
    GET_SEGMENTS_BY_CRITERIA_QUERY_HANDLER,
} from 'presentation/segment/adapters/constants';
import {
    CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    CREATE_CUSTOMIZATION_COMMAND_HANDLER,
    GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
} from 'presentation/customization/adapters/constants';
import {
    CREATE_ACCOUNT_COMMAND_HANDLER,
    CREATE_USER_COMMAND_HANDLER,
    GET_USER_BY_EMAIl_QUERY_HANDLER,
} from 'presentation/auth/adapters/constants';
import {
    CREATE_CATEGORY_COMMAND_HANDLER,
    GET_CATEGORIES_BY_WORKSPACE_ID_QUERY_HANDLER,
    GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
} from 'presentation/category/adapters/constants';
import {
    CREATE_SHOP_COMMAND_HANDLER,
    GET_SHOP_BY_SLUG_QUERY_HANDLER,
    GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
} from 'presentation/shop/adapters/constants';
import {
    CREATE_OFFER_COMMAND_HANDLER,
    GET_OFFERS_BY_SHOP_QUERY_HANDLER,
} from 'presentation/offer/adapters/constants';
import {
    ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
    CREATE_ROLE_COMMAND_HANDLER,
    UPDATE_ROLE_COMMAND_HANDLER,
} from 'presentation/role/adapters/constants';
import { CREATE_PERMISSION_COMMAND_HANDLER } from 'presentation/permission/adapters/constants';
import {
    ADD_ROLE_TO_USER_COMMAND_HANDLER,
    GET_USER_BY_ID_QUERY_HANDLER,
    GET_USER_INFO_BY_ID_QUERY_HANDLER,
    GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
} from 'presentation/user/adapters/constants';
import { CREATE_PROFILE_COMMAND_HANDLER } from 'presentation/profile/adapters/constants';
import { CREATE_VISIT_COMMAND_HANDLER } from 'presentation/tracking/adapters/constants';

import {
    COMMAND_BUS,
    COMMAND_HANDLERS,
    DRIZZLE_INSTANCE,
    EVENT_BUS,
    EVENT_SUBSCRIBERS,
    QUERY_BUS,
    QUERY_HANDLERS,
} from './constants';

export const drizzleInstanceProvider: Provider = {
    provide: DRIZZLE_INSTANCE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const connection = configService.getOrThrow<string>('database.url');
        const nodeEnv = configService.getOrThrow<string>('app.nodeEnv');

        const pool = DrizzleClientFactory.createPool({
            connectionString: connection,
            ssl: nodeEnv === 'production',
        });

        return DrizzleClientFactory.createClient(pool);
    },
    scope: Scope.DEFAULT,
};

export const eventSubscribersProvider: Provider = {
    provide: EVENT_SUBSCRIBERS,
    inject: [],
    useFactory: () => new EventSubscribers([]),
    scope: Scope.DEFAULT,
};

export const eventBusProvider: Provider = {
    provide: EVENT_BUS,
    inject: [EVENT_SUBSCRIBERS],
    useFactory: (subscribers: EventSubscribers) => new InMemoryEventBus(subscribers),
    scope: Scope.DEFAULT,
};

export const queryHandlersProvider: Provider = {
    provide: QUERY_HANDLERS,
    inject: [
        GET_WORKSPACES_QUERY_HANDLER,
        GET_WORKSPACE_BY_ID_QUERY_HANDLER,
        GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
        GET_USER_BY_ID_QUERY_HANDLER,
        GET_USER_INFO_BY_ID_QUERY_HANDLER,
        GET_USER_BY_EMAIl_QUERY_HANDLER,
        GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
        GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
        GET_SHOP_BY_SLUG_QUERY_HANDLER,
        GET_OFFERS_BY_SHOP_QUERY_HANDLER,
        GET_SEGMENTS_BY_CRITERIA_QUERY_HANDLER,
        GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
        GET_GEOLOCATIONS_BY_WORKSPACE_QUERY_HANDLER,
        GET_CATEGORIES_BY_WORKSPACE_ID_QUERY_HANDLER,
    ],
    useFactory: (
        getWorkspacesQueryHandler: GetWorkspacesQueryHandler,
        getWorkspaceByIdQueryHandler: GetWorkspaceByIdQueryHandler,
        getCustomizationByWorkspaceQueryHandler: GetCustomizationByWorkspaceQueryHandler,
        getUserByIdQueryHandler: GetUserByIdQueryHandler,
        getUserInfoByIdQueryHandler: GetUserInfoByIdQueryHandler,
        getUserByEmailQueryHandler: GetUserByEmailQueryHandler,
        getCategoryBySlugQueryHandler: GetCategoryBySlugQueryHandler,
        getShopsByWorkspaceQueryHandler: GetShopsByWorkspaceQueryHandler,
        getShopBySlugQueryHandler: GetShopBySlugQueryHandler,
        getOffersByShopQueryHandler: GetOffersByShopQueryHandler,
        getSegmentsByCriteriaQueryHandler: GetSegmentsByCriteriaQueryHandler,
        getWorkspacesByOwnerIdQueryHandler: GetWorkspacesByUserIdQueryHandler,
        getGeolocationsByWorkspaceQueryHandler: GetGeolocationsByWorkspaceQueryHandler,
        getCategoriesByWorkspaceIdQueryHandler: GetCategoriesByWorkspaceIdQueryHandler,
    ) =>
        new QueryHandlers([
            getWorkspacesQueryHandler,
            getWorkspaceByIdQueryHandler,
            getCustomizationByWorkspaceQueryHandler,
            getUserByIdQueryHandler,
            getUserInfoByIdQueryHandler,
            getUserByEmailQueryHandler,
            getCategoryBySlugQueryHandler,
            getShopsByWorkspaceQueryHandler,
            getShopBySlugQueryHandler,
            getOffersByShopQueryHandler,
            getSegmentsByCriteriaQueryHandler,
            getWorkspacesByOwnerIdQueryHandler,
            getGeolocationsByWorkspaceQueryHandler,
            getCategoriesByWorkspaceIdQueryHandler,
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
        CREATE_OFFER_COMMAND_HANDLER,
        CREATE_ROLE_COMMAND_HANDLER,
        UPDATE_ROLE_COMMAND_HANDLER,
        ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
        CREATE_PERMISSION_COMMAND_HANDLER,
        ADD_ROLE_TO_USER_COMMAND_HANDLER,
        CREATE_PROFILE_COMMAND_HANDLER,
        CREATE_CUSTOMIZATION_COMMAND_HANDLER,
        CREATE_VISIT_COMMAND_HANDLER,
        CREATE_SHOP_COMMAND_HANDLER,
        CREATE_CATEGORY_COMMAND_HANDLER,
    ],
    useFactory: (
        createWorkspaceCommandHandler: CreateWorkspaceCommandHandler,
        createSegmentCommandHandler: CreateSegmentCommandHandler,
        createUserCommandHandler: CreateUserCommandHandler,
        createAccountCommandHandler: CreateAccountCommandHandler,
        createCustomizationColorCommandHandler: CreateCustomizationColorCommandHandler,
        createOfferCommandHandler: CreateOfferCommandHandler,
        createRoleCommandHandler: CreateRoleCommandHandler,
        updateRoleCommandHandler: UpdateRoleCommandHandler,
        addPermissionToRoleCommandHandler: AddPermissionToRoleCommandHandler,
        createPermissionCommandHandler: CreatePermissionCommandHandler,
        addRoleToUserCommandHandler: AddRoleToUserCommandHandler,
        createProfileCommandHandler: CreateProfileCommandHandler,
        createCustomizationCommandHandler: CreateCustomizationCommandHandler,
        createVisitCommandHandler: CreateVisitCommandHandler,
        createShopCommandHandler: CreateShopCommandHandler,
        createCategoryCommandHandler: CreateCategoryCommandHandler,
    ) =>
        new CommandHandlers([
            createWorkspaceCommandHandler,
            createSegmentCommandHandler,
            createUserCommandHandler,
            createAccountCommandHandler,
            createCustomizationColorCommandHandler,
            createOfferCommandHandler,
            createRoleCommandHandler,
            updateRoleCommandHandler,
            addPermissionToRoleCommandHandler,
            createPermissionCommandHandler,
            addRoleToUserCommandHandler,
            createProfileCommandHandler,
            createCustomizationCommandHandler,
            createVisitCommandHandler,
            createShopCommandHandler,
            createCategoryCommandHandler,
        ]),
    scope: Scope.DEFAULT,
};

export const commandBusProvider: Provider = {
    provide: COMMAND_BUS,
    inject: [COMMAND_HANDLERS],
    useFactory: (handlers: CommandHandlers) => new InMemoryCommandBus(handlers),
    scope: Scope.DEFAULT,
};
