import { Command } from 'shared/domain/command';

import { ReactionTargets } from 'core/social/reaction/domain/enum/reaction-targets';

export class LikeCommand extends Command {
    readonly targetId: string;
    readonly targetType: ReactionTargets;
    readonly userId: string;

    constructor(targetId: string, targetType: ReactionTargets, userId: string) {
        super();

        this.targetId = targetId;
        this.targetType = targetType;
        this.userId = userId;
    }
}
