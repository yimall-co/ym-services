import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Geolocation } from 'vm/geolocation/domain/geolocation';
import { GeolocationRepository } from 'vm/geolocation/domain/geolocation.repository';

import { geolocations } from './drizzle/geolocations.table';

export class DrizzleGeolocationRepository
    extends DrizzleRepository<typeof geolocations>
    implements GeolocationRepository {
    protected readonly table = geolocations;

    async existsByShopId(shopId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async save(geolocation: Geolocation): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
