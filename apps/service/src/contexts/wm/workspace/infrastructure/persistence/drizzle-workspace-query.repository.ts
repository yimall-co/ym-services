/* eslint-disable prettier/prettier */
import { and, desc, eq, lt, or, SQL, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';
import { categories } from 'lm/category/infrastructure/persistence/drizzle/categories.table';
import { segments } from 'wm/segment/infrastructure/persistence/drizzle/segments.table';
import { WorkspaceDto } from 'wm/workspace/application/query/get-workspaces/dto';
import { WorkspaceByIdDto } from 'wm/workspace/application/query/get-workspace-by-id/dto';
import {
    PaginatedWorkspace,
    WorkspaceQueryRepository,
} from 'wm/workspace/application/query/workspace-query.repository';

import { workspaces } from '../persistence/drizzle/workspaces.table';

export class DrizzleWorkspaceQueryRepository
    extends DrizzleRepository<typeof workspaces>
    implements WorkspaceQueryRepository {
    protected readonly table = workspaces;

    async findAll(criteria: {
        limit?: number;
        cursor?: { id?: string; updatedAt?: Date };
    }): Promise<PaginatedWorkspace<WorkspaceDto>> {
        const { limit = 10, cursor } = criteria;

        let query = this.getBaseQuery();

        query = this.withOwner(query);
        query = this.withSegment(query);

        const rows = await query
            .where(
                this.withValid(
                    cursor && cursor.id && cursor.updatedAt ? or(
                        lt(this.table.updatedAt, cursor.updatedAt),
                        and(
                            eq(this.table.updatedAt, cursor.updatedAt),
                            lt(this.table.id, cursor.id),
                        ),
                    ) : undefined,
                ),
            )
            .orderBy(
                desc(this.table.updatedAt),
                desc(this.table.id),
            )
            .limit(limit + 1);

        return this.withCursorPagination<WorkspaceDto>(rows, limit);
    }

    async findById(id: string): Promise<WorkspaceByIdDto | null> {
        let query = this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                description: this.table.description,
                tin: this.table.tin,
                segmentId: this.table.segmentId,
                ownerId: this.table.ownerId,
                segment: {
                    id: segments.id,
                    name: segments.name,
                    slug: segments.slug,
                    description: segments.description,
                },
                owner: {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                },
                categories: sql<WorkspaceByIdDto['categories']>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${categories.id},
                                'label', ${categories.label}
                            )
                        ) filter (where ${categories.id} is not null),
                        '[]'::json
                    )
                `,
            })
            .from(this.table)
            .$dynamic();

        query = this.withOwner(query);
        query = this.withSegment(query);
        query = this.withCategories(query);

        query = query
            .where(
                and(
                    eq(this.table.id, id),
                    eq(this.table.isVerified, true),
                    eq(segments.isActive, true),
                ),
            )
            .groupBy(this.table.id, segments.id, users.id)
            .limit(1);

        const [row] = await query;

        return row ?? null;
    }

    findOne(id: string): Promise<WorkspaceByIdDto | null> {
        throw new Error('Not implemented');
    }

    private getBaseQuery() {
        return this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                slug: this.table.slug,
                description: this.table.description,
                tin: this.table.tin,
                isVerified: this.table.isVerified,
                isRemoved: this.table.isRemoved,
                isActive: this.table.isActive,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                segmentId: this.table.segmentId,
                ownerId: this.table.ownerId,
                owner: {
                    name: users.name,
                },
                segment: {
                    name: segments.name,
                },
            })
            .from(this.table)
            .$dynamic();
    }

    private withValid(condition?: SQL) {
        return and(
            condition ? condition : undefined,
            eq(this.table.isActive, true),
            eq(this.table.isVerified, true),
            eq(this.table.isRemoved, false),
        )
    }

    private withOwner<T extends PgSelect>(query: T) {
        return query.innerJoin(users, eq(users.id, this.table.ownerId));
    }

    private withSegment<T extends PgSelect>(query: T) {
        return query.innerJoin(segments, eq(segments.id, this.table.segmentId));
    }

    private withCategories<T extends PgSelect>(query: T) {
        return query.innerJoin(categories, eq(categories.workspaceId, this.table.id));
    }
}
