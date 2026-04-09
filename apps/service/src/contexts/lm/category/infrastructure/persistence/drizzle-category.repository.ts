/* eslint-disable prettier/prettier */
import { and, eq } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Category } from 'lm/category/domain/category';
import { CategorySlug } from 'lm/category/domain/value-object/category-slug';
import { CategoryWorkspaceId } from 'lm/category/domain/value-object/category-workspace-id';
import { CategoryRepository } from 'lm/category/domain/category.repository';

import { categories } from './drizzle/categories.table';
import { CategoryMapper } from '../mapper/category.mapper';

export class DrizzleCategoryRepository
    extends DrizzleRepository<typeof categories>
    implements CategoryRepository {
    protected readonly table = categories;

    async existsBySlugAndWorkspace(
        slug: CategorySlug,
        workspaceId: CategoryWorkspaceId,
    ): Promise<boolean> {
        const rows = await this.client
            .select({ categoryId: this.table.id })
            .from(this.table)
            .where(
                and(
                    eq(this.table.slug, slug.value),
                    eq(this.table.workspaceId, workspaceId.value)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async save(category: Category): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, ...rest } = CategoryMapper.toPersistence(category);

            await tx
                .insert(this.table)
                .values(CategoryMapper.toPersistence(category))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                });
        });
    }

    async update(category: Category): Promise<void> {
        await this.client.update(this.table).set(category.toPrimitives());
    }
}
