import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ReactionRepository } from 'core/social/reaction/domain/reaction.repository';
import { ReactionRepositoryScope } from 'core/social/reaction/application/reaction.repository-scope';

import { DrizzleReactionRepository } from './drizzle-reaction.repository';

export class DrizzleReactionRepositoryScope implements ReactionRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getReactionRepository(): ReactionRepository {
        return new DrizzleReactionRepository(this.db);
    }
}
