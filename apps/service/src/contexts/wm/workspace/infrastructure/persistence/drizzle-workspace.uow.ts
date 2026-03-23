import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { WorkspaceRepositoryScope } from 'wm/workspace/application/workspace.repository-scope';

import { DrizzleWorkspaceRepositoryScope } from './drizzle-workspace.repository-scope';

export class DrizzleWorkspaceUnitOfWork implements UnitOfWork<WorkspaceRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: WorkspaceRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleWorkspaceRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
