import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CommentRepository } from 'core/social/comment/domain/comment.repository';
import { CommentRepositoryScope } from 'core/social/comment/application/comment.repository-scope';

import { DrizzleCommentRepository } from './drizzle-comment.repository';

export class DrizzleCommentRepositoryScope implements CommentRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getCommentRepository(): CommentRepository {
        return new DrizzleCommentRepository(this.db);
    }
}
