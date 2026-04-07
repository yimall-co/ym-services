import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { GeolocationRepositoryScope } from 'vm/geolocation/application/geolocation.repository-scope';

import { DrizzleGeolocationRepositoryScope } from './drizzle-geolocation.repository-scope';

export class DrizzleGeolocationUnitOfWork implements UnitOfWork<GeolocationRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: GeolocationRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleGeolocationRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
