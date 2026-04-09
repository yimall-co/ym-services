import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { CategoryRepositoryScope } from 'lm/category/application/category.repository-scope';

import { DrizzleCategoryRepositoryScope } from './drizzle-category.repository-scope';

export class DrizzleCategoryUnitOfWork implements UnitOfWork<CategoryRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: CategoryRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleCategoryRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
