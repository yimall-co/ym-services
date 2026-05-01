import { Command } from 'shared/domain/command';

import { CommentTargets } from 'socm/comment/domain/enum/comment-targets';

export class CommentateOnCommand extends Command {
    readonly targetId: string;
    readonly targetType: CommentTargets;
    readonly content: string;
    readonly userId: string;

    constructor(targetId: string, targetType: CommentTargets, content: string, userId: string) {
        super();

        this.targetId = targetId;
        this.targetType = targetType;
        this.content = content;
        this.userId = userId;
    }
}
