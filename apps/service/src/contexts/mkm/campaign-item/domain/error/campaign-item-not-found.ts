import { DomainError } from 'shared/domain/domain-error';

export class CampaignItemNotFound extends DomainError {
    constructor() {
        super('Campaign item(s) not found', 'CAMPAIGN_ITEM_NOT_FOUND');
    }
}
