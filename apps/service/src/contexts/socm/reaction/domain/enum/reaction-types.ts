export const reactionTypes = {
    LIKE: 'like',
    HEART: 'heart',
    DISLIKE: 'dislike',
} as const;

export type ReactionTypes = (typeof reactionTypes)[keyof typeof reactionTypes];
