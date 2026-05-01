import { Target } from 'shared/domain/value-object/target';

import { CommentTargets } from 'socm/comment/domain/enum/comment-targets';

export interface CommentTargetExistenceChecker {
    exists(target: Target<CommentTargets>): Promise<boolean>;
}
