import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { ProfileRepositoryScope } from 'iam/profiles/application/profile.repository-scope';

import { DrizzleProfileRepositoryScope } from './drizzle-profile.repository-scope';

export class DrizzleProfileUnitOfWork implements UnitOfWork<ProfileRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: ProfileRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (transaction) => {
            const scope = new DrizzleProfileRepositoryScope(this.db);
            const result = await fn(scope);

            return result;
        });
    }
}
