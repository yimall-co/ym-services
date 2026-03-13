import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ShopQueryRepository } from 'vm/shop/application/query/shop-query.repository';
import { DrizzleShopRepository } from 'vm/shop/infrastructure/persistence/drizzle-shop.repository';
import { DrizzleShopQueryRepository } from 'vm/shop/infrastructure/drizzle-shop-query.repository';
import { GetShopBySlugQueryHandler } from 'vm/shop/application/query/get-shop-by-slug/get-shop-by-slug.query-handler';
import { GetShopsByWorkspaceQueryHandler } from 'vm/shop/application/query/get-shops-by-workspace/get-shops-by-workspace.query-handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    GET_SHOP_BY_SLUG_QUERY_HANDLER,
    GET_SHOPS_BY_WORKSPACE_QUERY_HANDLER,
    SHOP_QUERY_REPOSITORY,
    SHOP_REPOSITORY,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

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
