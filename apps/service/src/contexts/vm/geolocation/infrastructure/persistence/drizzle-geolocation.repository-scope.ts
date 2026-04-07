import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { GeolocationRepository } from 'vm/geolocation/domain/geolocation.repository';
import { GeolocationRepositoryScope } from 'vm/geolocation/application/geolocation.repository-scope';
import { GeolocationQueryRepository } from 'vm/geolocation/application/query/geolocation-query.repository';

import { DrizzleGeolocationRepository } from './drizzle-geolocation.repository';
import { DrizzleGeolocationQueryRepository } from './drizzle-geolocation-query.repository';

export class DrizzleGeolocationRepositoryScope implements GeolocationRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getGeolocationRepository(): GeolocationRepository {
        return new DrizzleGeolocationRepository(this.db);
    }

    getGeolocationQueryRepository(): GeolocationQueryRepository {
        return new DrizzleGeolocationQueryRepository(this.db);
    }
}
