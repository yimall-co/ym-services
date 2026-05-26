import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CategoryRepository } from 'core/sales/category/domain/category.repository';
import { CategoryRepositoryScope } from 'core/sales/category/application/category.repository-scope';
import { CategoryQueryRepository } from 'core/sales/category/application/query/category-query.repository';

import { DrizzleCategoryRepository } from './drizzle-category.repository';
import { DrizzleCategoryQueryRepository } from './drizzle-category-query.repository';

export class DrizzleCategoryRepositoryScope implements CategoryRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            Schema
        >,
    ) { }

    getCategoryRepository(): CategoryRepository {
        return new DrizzleCategoryRepository(this.db);
    }

    getCategoryQueryRepository(): CategoryQueryRepository {
        return new DrizzleCategoryQueryRepository(this.db);
    }
}
