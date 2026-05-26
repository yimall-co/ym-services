import { Comment } from 'core/social/comment/domain/comment';

import { comments } from '../persistence/drizzle/comments.table';

export class DrizzleCommentMapper {
    static toDomain(primitives: typeof comments.$inferSelect): Comment {
        return Comment.fromPrimitives({
            id: primitives.id,
            content: primitives.content,
            target: {
                id: primitives.targetId,
                type: primitives.targetType,
            },
            isEdited: primitives.isEdited,
            isVisible: primitives.isVisible,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            userId: primitives.userId,
        });
    }

    static toPersistence(comment: Comment): typeof comments.$inferInsert {
        const primitives = comment.toPrimitives();

        return {
            id: primitives.id,
            content: primitives.content,
            targetId: primitives.target.id,
            targetType: primitives.target.type,
            userId: primitives.userId,
            isEdited: primitives.isEdited,
            isVisible: primitives.isVisible,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
        };
    }
}
