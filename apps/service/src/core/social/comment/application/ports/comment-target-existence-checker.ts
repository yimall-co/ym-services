import { Target } from 'shared/domain/value-object/target';

import { CommentTarget } from 'core/social/comment/domain/enum/comment-targets';

export interface CommentTargetExistenceChecker {
    exists(target: Target<CommentTarget>): Promise<boolean>;
}
