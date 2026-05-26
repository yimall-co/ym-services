export const commentTargets = {
    OFFER: 'offers',
    WORKSPACES: 'workspaces',
} as const;

export type CommentTarget = (typeof commentTargets)[keyof typeof commentTargets];
