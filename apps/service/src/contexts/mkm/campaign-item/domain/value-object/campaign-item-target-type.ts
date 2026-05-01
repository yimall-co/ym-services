import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export const campaignItemTargetTypes = {
    OFFER: 'offer',
    CATEGORY: 'category',
    SHOP: 'shop',
} as const;

export type CampaignItemTargetTypes =
    (typeof campaignItemTargetTypes)[keyof typeof campaignItemTargetTypes];

export class CampaignItemTargetType extends EnumValueObject<CampaignItemTargetTypes> {
    constructor(value: CampaignItemTargetTypes) {
        super(value, Object.values(campaignItemTargetTypes));
    }
}
