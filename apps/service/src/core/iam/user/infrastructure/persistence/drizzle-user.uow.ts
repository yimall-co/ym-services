import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { UserRepositoryScope } from 'core/iam/user/application/user.repository-scope';

import { DrizzleUserRepositoryScope } from './drizzle-user.repository-scope';

export class DrizzleUserUnitOfWork implements UnitOfWork<UserRepositoryScope> {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    withTransaction<T>(fn: (scope: UserRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleUserRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
