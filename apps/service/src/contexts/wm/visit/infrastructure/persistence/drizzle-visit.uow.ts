import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { VisitRepositoryScope } from 'wm/visit/application/visit.repository-scope';

import { DrizzleVisitRepositoryScope } from './drizzle-visit.repository-scope';

export class DrizzleVisitUnitOfWork implements UnitOfWork<VisitRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: VisitRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleVisitRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
