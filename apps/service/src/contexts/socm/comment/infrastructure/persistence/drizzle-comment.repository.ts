import { and, eq } from 'drizzle-orm';

import { Uuid } from 'shared/domain/value-object/uuid';
import { Target } from 'shared/domain/value-object/target';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Comment } from 'socm/comment/domain/comment';
import { CommentRepository } from 'socm/comment/domain/comment.repository';
import { CommentTargets } from 'socm/comment/domain/enum/comment-targets';

import { comments } from './drizzle/comments.table';
import { DrizzleCommentMapper } from '../mapper/drizzle-comment.mapper';

export class DrizzleCommentRepository
    extends DrizzleRepository<typeof comments>
    implements CommentRepository {
    protected readonly table = comments;

    async existsByUserAndTarget(userId: Uuid, target: Target<CommentTargets>): Promise<boolean> {
        // User cannot have multiple comments for the same target.
        const rows = await this.client
            .select({ commentId: this.table.id })
            .from(this.table)
            .where(
                and(
                    eq(this.table.userId, userId.value),
                    eq(this.table.targetId, target.id),
                    eq(this.table.targetType, target.type),
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async save(comment: Comment): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, ...rest } = DrizzleCommentMapper.toPersistence(comment);

            await tx
                .insert(this.table)
                .values({ id, ...rest })
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        content: rest.content,
                        isVisible: rest.isVisible,
                        isEdited: true,
                    },
                });
        });
    }
}
