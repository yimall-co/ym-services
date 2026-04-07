import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { ShopRepositoryScope } from 'vm/shop/application/shop.repository-scope';

import { DrizzleShopRepositoryScope } from './drizzle-shop.repository-scope';

export class DrizzleShopUnitOfWork implements UnitOfWork<ShopRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: ShopRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleShopRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
