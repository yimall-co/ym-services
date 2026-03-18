/* eslint-disable prettier/prettier */
import { eq, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { customizationColors } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { CustomizationQueryRepository } from 'wm/customization/application/query/customization-query.repository';
import {
    Color,
    CustomizationByWorkspaceDto,
} from 'wm/customization/application/query/get-customization-by-workspace/dto';

import { customizations } from './persistence/drizzle/customizations.table';
import { CustomizationByIdDto } from '../application/query/get-customization-by-id/dto';

export class DrizzleCustomizationQueryRepository
    extends DrizzleRepository<typeof customizations>
    implements CustomizationQueryRepository {
    protected readonly table = customizations;

    async findOneById(id: string): Promise<CustomizationByIdDto | null> {
        let query = this.client
            .select({
                id: this.table.id,
                logo: this.table.logo,
                fontPrimary: this.table.fontPrimary,
                fontSecondary: this.table.fontSecondary,
                showName: this.table.showName,
            })
            .from(this.table)
            .$dynamic();

        query = this.withColors(query);

        const [row] = await query
            .where(eq(this.table.id, id))
            .limit(1);

        return row ?? null;
    }

    async findOneByWorkspace(workspaceId: string): Promise<CustomizationByWorkspaceDto> {
        let query = this.client
            .select({
                id: this.table.id,
                logo: this.table.logo,
                fontPrimary: this.table.fontPrimary,
                fontSecondary: this.table.fontSecondary,
                showName: this.table.showName,
                socialMedia: this.table.socialMedia,
                createdAt: this.table.createdAt,
                updatedAt: this.table.createdAt,
                workspaceId: this.table.workspaceId,
                colors: sql<Array<Color>>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${customizationColors.id},
                                'label', ${customizationColors.label},
                                'value', ${customizationColors.value},
                                'isDefault', ${customizationColors.isDefault}
                            )
                        ) filter (where ${customizationColors.id} is not null),
                        '[]'::json
                    )
                `,
            })
            .from(this.table)
            .$dynamic();

        query = this.withColors(query);

        query = query
            .where(eq(this.table.workspaceId, workspaceId))
            .groupBy(this.table.id)
            .limit(1);

        const [row] = await query;

        return row;
    }

    private withColors<T extends PgSelect>(query: T) {
        return query.leftJoin(
            customizationColors,
            eq(customizationColors.customizationId, this.table.id),
        );
    }
}
