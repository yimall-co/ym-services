export const reactionTargets = {
    OFFER: 'offers',
    SHOP: 'shops',
    WORKSPACE: 'workspaces',
} as const;

export type ReactionTargets = (typeof reactionTargets)[keyof typeof reactionTargets];
