import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { PermissionRepositoryScope } from 'iam/permission/application/permission.repository-scope';
import { DrizzlePermissionRepositoryScope } from './drizzle-permission.repository-scope';

export class DrizzlePermissionUnitOfWork implements UnitOfWork<PermissionRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: PermissionRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzlePermissionRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
