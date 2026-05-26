import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { ReactionRepositoryScope } from 'core/social/reaction/application/reaction.repository-scope';

import { DrizzleReactionRepositoryScope } from './drizzle-reaction.repository-scope';

export class DrizzleReactionUnitOfWork implements UnitOfWork<ReactionRepositoryScope> {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    withTransaction<T>(fn: (scope: ReactionRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleReactionRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
