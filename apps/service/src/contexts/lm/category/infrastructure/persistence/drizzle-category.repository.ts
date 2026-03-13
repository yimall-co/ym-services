import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Category } from 'lm/category/domain/category';
import { CategoryRepository } from 'lm/category/domain/category.repository';

import { categories } from './drizzle/categories.table';

export class DrizzleCategoryRepository
    extends DrizzleRepository<typeof categories>
    implements CategoryRepository {
    protected readonly table = categories;

    async save(category: Category): Promise<void> {
        await this.client.insert(this.table).values(category.toPrimitives());
    }

    async update(category: Category): Promise<void> {
        await this.client.update(this.table).set(category.toPrimitives());
    }
}
