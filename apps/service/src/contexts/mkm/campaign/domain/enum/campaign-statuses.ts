export const campaignStatuses = {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
} as const;

export type CampaignStatuses = (typeof campaignStatuses)[keyof typeof campaignStatuses];
