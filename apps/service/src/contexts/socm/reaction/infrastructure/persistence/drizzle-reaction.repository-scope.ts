import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ReactionRepository } from 'socm/reaction/domain/reaction.repository';
import { ReactionRepositoryScope } from 'socm/reaction/application/reaction.repository-scope';

import { DrizzleReactionRepository } from './drizzle-reaction.repository';

export class DrizzleReactionRepositoryScope implements ReactionRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            Schema
        >,
    ) { }

    getReactionRepository(): ReactionRepository {
        return new DrizzleReactionRepository(this.db);
    }
}
