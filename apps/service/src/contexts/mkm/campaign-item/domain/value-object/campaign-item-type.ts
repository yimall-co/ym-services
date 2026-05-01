import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export const campaignItemTypes = {
    CARD: 'CARD',
    FEATURED: 'FEATURED',
    BANNER: 'BANNER',
    HERO: 'HERO',
} as const;

export type CampaignItemTypes = (typeof campaignItemTypes)[keyof typeof campaignItemTypes];

export class CampaignItemType extends EnumValueObject<CampaignItemTypes> {
    constructor(value: CampaignItemTypes) {
        super(value, Object.values(campaignItemTypes));
    }
}
