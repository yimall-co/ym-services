/* eslint-disable prettier/prettier */
import { and, asc, eq } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { shops } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { GeolocationQueryRepository } from 'vm/geolocation/application/query/geolocation-query.repository';
import { GeolocationByWorkspaceDto } from 'vm/geolocation/application/query/get-geolocations-by-workspace/dto';

import { geolocations } from './drizzle/geolocations.table';

export class DrizzleGeolocationQueryRepository
    extends DrizzleRepository<typeof geolocations>
    implements GeolocationQueryRepository {
    protected readonly table = geolocations;

    async findByWorkspace(workspaceId: string): Promise<Array<GeolocationByWorkspaceDto>> {
        let query = this.client
            .select({
                id: this.table.id,
                latitude: this.table.latitude,
                longitude: this.table.longitude,
                accuracy: this.table.accuracy,
                shopId: this.table.shopId,
            })
            .from(this.table)
            .$dynamic();

        query = this.withShop(query);

        const rows = await query
            .where(and(
                eq(shops.isVerified, true),
                eq(shops.workspaceId, workspaceId),
            ))
            .orderBy(asc(this.table.createdAt));

        return rows;
    }

    private withShop<T extends PgSelect>(query: T) {
        return query.leftJoin(shops, eq(shops.id, geolocations.shopId));
    }
}
