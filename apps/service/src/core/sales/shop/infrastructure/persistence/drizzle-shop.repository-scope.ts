import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ShopRepository } from 'core/sales/shop/domain/shop.repository';
import { ShopRepositoryScope } from 'core/sales/shop/application/shop.repository-scope';
import { ShopQueryRepository } from 'core/sales/shop/application/query/shop-query.repository';

import { DrizzleShopRepository } from './drizzle-shop.repository';
import { DrizzleShopQueryRepository } from './drizzle-shop-query.repository';

export class DrizzleShopRepositoryScope implements ShopRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getShopRepository(): ShopRepository {
        return new DrizzleShopRepository(this.db);
    }

    getShopQueryRepository(): ShopQueryRepository {
        return new DrizzleShopQueryRepository(this.db);
    }
}
