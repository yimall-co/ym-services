export const commentTargets = {
    OFFER: 'offers',
    WORKSPACES: 'workspaces',
} as const;

export type CommentTargets = (typeof commentTargets)[keyof typeof commentTargets];
