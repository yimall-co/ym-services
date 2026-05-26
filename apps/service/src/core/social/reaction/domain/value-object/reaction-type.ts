import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { reactionTypes, ReactionTypes } from '../enum/reaction-types';

export class ReactionType extends EnumValueObject<ReactionTypes> {
    constructor(value: ReactionTypes) {
        super(value, Object.values(reactionTypes));
    }

    dislike(): void {
        this.value = reactionTypes.DISLIKE;
    }

    like(): void {
        this.value = reactionTypes.LIKE;
    }

    heart(): void {
        this.value = reactionTypes.HEART;
    }

    isLike(): boolean {
        return this.value === reactionTypes.LIKE;
    }

    isHeart(): boolean {
        return this.value === reactionTypes.HEART;
    }

    isDislike(): boolean {
        return this.value === reactionTypes.DISLIKE;
    }
}
