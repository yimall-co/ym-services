/* eslint-disable prettier/prettier */
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { subcategories } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { CategoryByIdDto } from 'lm/category/application/query/get-category-by-id/dto';
import { CategoryBySlugDto } from 'lm/category/application/query/get-category-by-slug/dto';
import { CategoryByWorkspaceIdDto } from 'lm/category/application/query/get-categories-by-workspace-id/dto';
import { CategoryQueryRepository } from 'lm/category/application/query/category-query.repository';

import { categories } from './drizzle/categories.table';

export class DrizzleCategoryQueryRepository
    extends DrizzleRepository<typeof categories>
    implements CategoryQueryRepository {
    protected readonly table = categories;

    async findById(id: string): Promise<CategoryByIdDto | null> {
        let query = this.client
            .select({
                id: this.table.id,
                label: this.table.label,
                slug: this.table.slug,
                description: this.table.description,
                banner: this.table.banner,
                position: this.table.position,
                isActive: this.table.isActive,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                workspaceId: this.table.workspaceId,
            })
            .from(this.table)
            .$dynamic();

        query = query.where(and(eq(this.table.id, id), eq(this.table.isActive, true))).limit(1);

        const [row] = await query;
        return row ?? null;
    }

    async findBySlug(slug: string): Promise<CategoryBySlugDto | null> {
        let query = this.client
            .select({
                id: this.table.id,
                label: this.table.label,
                slug: this.table.slug,
                description: this.table.description,
                banner: this.table.banner,
                position: this.table.position,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                workspaceId: this.table.workspaceId,
                subcategories: sql<CategoryBySlugDto['subcategories']>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${subcategories.id},
                                'label', ${subcategories.label},
                                'slug', ${subcategories.slug},
                                'description', ${subcategories.description},
                                'position', ${subcategories.position}
                            )
                        ) filter (where ${subcategories.id} is not null),
                         '[]'::json
                    )
                `,
            })
            .from(this.table)
            .$dynamic();

        query = this.withSubcategories(query);

        query = query
            .where(
                and(
                    eq(this.table.slug, slug),
                    eq(this.table.isActive, true)
                )
            )
            .groupBy(this.table.id, subcategories.id)
            .limit(1);

        const [row] = await query;
        return row ?? null;
    }

    async findAllByWorkspaceId(workspaceId: string): Promise<Array<CategoryByWorkspaceIdDto>> {
        const query = this.client
            .select({
                id: this.table.id,
                label: this.table.label,
                slug: this.table.slug,
                description: this.table.description,
                banner: this.table.banner,
                position: this.table.position,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                workspaceId: this.table.workspaceId,
            })
            .from(this.table)
            .$dynamic();

        // query = this.withSubcategories(query);

        const rows = query
            .where(
                and(
                    eq(this.table.isActive, true),
                    eq(this.table.workspaceId, workspaceId),
                ),
            )
            .orderBy(
                asc(this.table.position),
                desc(this.table.createdAt),
                desc(this.table.updatedAt),
            );

        return rows;
    }

    private withSubcategories<T extends PgSelect>(query: T) {
        return query.leftJoin(subcategories, eq(subcategories.categoryId, this.table.id));
    }
}
