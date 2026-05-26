import { Uuid } from 'shared/domain/value-object/uuid';
import { Target } from 'shared/domain/value-object/target';

import { Comment } from './comment';
import { CommentTarget } from './enum/comment-targets';

export interface CommentRepository {
    existsByUserAndTarget(userId: Uuid, target: Target<CommentTarget>): Promise<boolean>;
    save(comment: Comment): Promise<void>;
}
