import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { campaignStatuses, CampaignStatuses } from '../enum/campaign-statuses';

export class CampaignStatus extends EnumValueObject<CampaignStatuses> {
    constructor(value: CampaignStatuses) {
        super(value, Object.values(campaignStatuses));
    }
}
