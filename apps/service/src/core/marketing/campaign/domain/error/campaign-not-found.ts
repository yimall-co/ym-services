import { DomainError } from 'shared/domain/domain-error';

export class CampaignNotFound extends DomainError {
    constructor() {
        super('Campaign or campaigns not found', 'CAMPAIGN_NOT_FOUND');
    }
}
