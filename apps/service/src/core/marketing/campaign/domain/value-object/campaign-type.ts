import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { campaignTypes, CampaignTypes } from '../enum/campaign-types';

export class CampaignType extends EnumValueObject<CampaignTypes> {
    constructor(value: CampaignTypes) {
        super(value, Object.values(campaignTypes));
    }
}
