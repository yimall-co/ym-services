export const campaignTypes = {
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    LAUNCH: 'launch',
} as const;

export type CampaignTypes = (typeof campaignTypes)[keyof typeof campaignTypes];
