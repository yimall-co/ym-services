/* eslint-disable prettier/prettier */
import { and, desc, eq, lt, or } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { segments } from './persistence/drizzle/segments.table';
import { SegmentQueryRepository } from '../application/query/segment-query.repository';
import { SegmentByCriteriaDto } from '../application/query/get-segments-by-criteria/dto';

export class DrizzleSegmentQueryRepository
    extends DrizzleRepository<typeof segments>
    implements SegmentQueryRepository {
    protected readonly table = segments;

    async findAll(criteria: {
        limit?: number;
        cursor?: { id?: string; updatedAt?: Date; };
    }) {
        const { limit = 10, cursor } = criteria;

        const query = this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                slug: this.table.slug,
                description: this.table.description,
                isActive: this.table.isActive,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
            })
            .from(this.table)
            .$dynamic();

        const rows = await query
            .where(
                and(
                    cursor && cursor.id && cursor.updatedAt ? or(
                        lt(this.table.updatedAt, cursor.updatedAt),
                        and(
                            eq(this.table.updatedAt, cursor.updatedAt),
                            lt(this.table.id, cursor.id),
                        ),
                    ) : undefined,
                )
            )
            .orderBy(
                desc(this.table.updatedAt),
                desc(this.table.id),
            )
            .limit(limit + 1);

        return this.withCursorPagination<SegmentByCriteriaDto>(rows, limit);
    }
}
