/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { and, desc, eq, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';
import { categories } from 'lm/category/infrastructure/persistence/drizzle/categories.table';
import { segments } from 'wm/segment/infrastructure/persistence/drizzle/segments.table';
import { WorkspaceDto } from 'wm/workspace/application/query/get-workspaces/get-workspaces.dto';
import { WorkspaceByIdDto } from 'wm/workspace/application/query/get-workspace-by-id/get-workspace-by-id.dto';
import { WorkspaceQueryRepository } from 'wm/workspace/application/query/workspace-query.repository';

import { workspaces } from './persistence/drizzle/workspaces.table';

export class DrizzleWorkspaceQueryRepository
    extends DrizzleRepository<typeof workspaces>
    implements WorkspaceQueryRepository {
    protected readonly table = workspaces;

    async findAll(): Promise<Array<WorkspaceDto>> {
        let query = this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                slug: this.table.slug,
                description: this.table.description,
                tin: this.table.tin,
                isVerified: this.table.isVerified,
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

        query = this.withOwner(query);
        query = this.withSegment(query);

        query = query.where(eq(this.table.isActive, true)).orderBy(desc(this.table.createdAt));

        const rows = await query;
        return rows;
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
