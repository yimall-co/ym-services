import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { CommentRepositoryScope } from 'socm/comment/application/comment.repository-scope';

import { DrizzleCommentRepositoryScope } from './drizzle-comment.repository-scope';

export class DrizzleCommentUnitOfWork implements UnitOfWork<CommentRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            Schema
        >,
    ) { }

    withTransaction<T>(fn: (scope: CommentRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleCommentRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
