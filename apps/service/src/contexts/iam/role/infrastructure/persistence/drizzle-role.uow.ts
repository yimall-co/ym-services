import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { RoleRepositoryScope } from 'iam/role/application/role.repository-scope';

import { DrizzleRoleRepositoryScope } from './drizzle-role.repository-scope';

export class DrizzleRoleUnitOfWork implements UnitOfWork<RoleRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: RoleRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleRoleRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
