import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CategoryRepository } from 'lm/category/domain/category.repository';
import { CategoryRepositoryScope } from 'lm/category/application/category.repository-scope';
import { CategoryQueryRepository } from 'lm/category/application/query/category-query.repository';

import { DrizzleCategoryRepository } from './drizzle-category.repository';
import { DrizzleCategoryQueryRepository } from './drizzle-category-query.repository';

export class DrizzleCategoryRepositoryScope implements CategoryRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getCategoryRepository(): CategoryRepository {
        return new DrizzleCategoryRepository(this.db);
    }

    getCategoryQueryRepository(): CategoryQueryRepository {
        return new DrizzleCategoryQueryRepository(this.db);
    }
}
