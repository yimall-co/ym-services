import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ShopQueryRepository } from 'vm/shop/application/query/shop-query.repository';
import { DrizzleShopRepository } from 'vm/shop/infrastructure/persistence/drizzle-shop.repository';
import { DrizzleShopQueryRepository } from 'vm/shop/infrastructure/persistence/drizzle-shop-query.repository';
import { GetShopBySlugQueryHandler } from 'vm/shop/application/query/get-shop-by-slug/handler';
import { GetShopsByWorkspaceQueryHandler } from 'vm/shop/application/query/get-shops-by-workspace/handler';
import { DrizzleShopUnitOfWork } from 'vm/shop/infrastructure/persistence/drizzle-shop.uow';
import { CreateShopCommandHandler } from 'vm/shop/application/command/create-shop/handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CREATE_SHOP_COMMAND_HANDLER,
    GET_SHOP_BY_SLUG_QUERY_HANDLER,
    GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
    SHOP_QUERY_REPOSITORY,
    SHOP_REPOSITORY,
    SHOP_UNIT_OF_WORK,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const shopUnitOfWorkProvider: Provider = {
    provide: SHOP_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleShopUnitOfWork(database),
    scope: Scope.DEFAULT,
};

export const shopRepositoryProvider: Provider = {
    provide: SHOP_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleShopRepository(database),
    scope: Scope.DEFAULT,
};

export const shopQueryRepositoryProvider: Provider = {
    provide: SHOP_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleShopQueryRepository(database),
    scope: Scope.DEFAULT,
};

export const getShopBySlugQueryHandlerProvider: Provider = {
    provide: GET_SHOP_BY_SLUG_QUERY_HANDLER,
    inject: [SHOP_QUERY_REPOSITORY],
    useFactory: (shopQueryRepository: ShopQueryRepository) =>
        new GetShopBySlugQueryHandler(shopQueryRepository),
    scope: Scope.DEFAULT,
};

export const getShopsByWorkspaceQueryHandlerProvider: Provider = {
    provide: GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
    inject: [SHOP_QUERY_REPOSITORY],
    useFactory: (shopQueryRepository: ShopQueryRepository) =>
        new GetShopsByWorkspaceQueryHandler(shopQueryRepository),
    scope: Scope.DEFAULT,
};

export const createShopCommandHandlerProvider: Provider = {
    provide: CREATE_SHOP_COMMAND_HANDLER,
    inject: [SHOP_UNIT_OF_WORK],
    useFactory: (shopUnitOfWork: DrizzleShopUnitOfWork) =>
        new CreateShopCommandHandler(shopUnitOfWork),
    scope: Scope.DEFAULT,
};
