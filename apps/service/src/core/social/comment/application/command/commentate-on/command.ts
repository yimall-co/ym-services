import { Command } from 'shared/domain/command';

import { CommentTarget } from 'core/social/comment/domain/enum/comment-targets';

export class CommentateOnCommand extends Command {
    readonly targetId: string;
    readonly targetType: CommentTarget;
    readonly content: string;
    readonly userId: string;

    constructor(targetId: string, targetType: CommentTarget, content: string, userId: string) {
        super();

        this.targetId = targetId;
        this.targetType = targetType;
        this.content = content;
        this.userId = userId;
    }
}
