/* eslint-disable prettier/prettier */
import { and, asc, eq } from 'drizzle-orm';

import { shops } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { GeolocationQueryRepository } from 'core/location/geolocation/application/query/geolocation-query.repository';
import { GeolocationByWorkspaceDto } from 'core/location/geolocation/application/query/get-geolocations-by-workspace/dto';

import { geolocations } from './drizzle/geolocations.table';

export class DrizzleGeolocationQueryRepository
    extends DrizzleRepository<typeof geolocations>
    implements GeolocationQueryRepository {
    protected readonly table = geolocations;

    async findByWorkspace(workspaceId: string): Promise<Array<GeolocationByWorkspaceDto>> {
        const query = this.client
            .select({
                id: this.table.id,
                latitude: this.table.latitude,
                longitude: this.table.longitude,
                accuracy: this.table.accuracy,
            })
            .from(this.table)
            .$dynamic();

        const rows = await query
            .where(and(
                eq(shops.isVerified, true),
                eq(shops.workspaceId, workspaceId),
            ))
            .orderBy(asc(this.table.createdAt));

        return rows;
    }
}
