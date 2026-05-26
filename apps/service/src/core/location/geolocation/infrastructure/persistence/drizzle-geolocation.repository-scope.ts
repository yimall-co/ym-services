import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { GeolocationRepository } from 'core/location/geolocation/domain/geolocation.repository';
import { GeolocationRepositoryScope } from 'core/location/geolocation/application/geolocation.repository-scope';
import { GeolocationQueryRepository } from 'core/location/geolocation/application/query/geolocation-query.repository';

import { DrizzleGeolocationRepository } from './drizzle-geolocation.repository';
import { DrizzleGeolocationQueryRepository } from './drizzle-geolocation-query.repository';

export class DrizzleGeolocationRepositoryScope implements GeolocationRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getGeolocationRepository(): GeolocationRepository {
        return new DrizzleGeolocationRepository(this.db);
    }

    getGeolocationQueryRepository(): GeolocationQueryRepository {
        return new DrizzleGeolocationQueryRepository(this.db);
    }
}
