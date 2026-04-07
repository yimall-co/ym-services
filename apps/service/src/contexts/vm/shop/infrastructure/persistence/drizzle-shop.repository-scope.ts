import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ShopRepository } from 'vm/shop/domain/shop.repository';
import { ShopRepositoryScope } from 'vm/shop/application/shop.repository-scope';
import { ShopQueryRepository } from 'vm/shop/application/query/shop-query.repository';

import { DrizzleShopRepository } from './drizzle-shop.repository';
import { DrizzleShopQueryRepository } from './drizzle-shop-query.repository';

export class DrizzleShopRepositoryScope implements ShopRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getShopRepository(): ShopRepository {
        return new DrizzleShopRepository(this.db);
    }

    getShopQueryRepository(): ShopQueryRepository {
        return new DrizzleShopQueryRepository(this.db);
    }
}
