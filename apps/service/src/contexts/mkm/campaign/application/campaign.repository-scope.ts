import { CampaignRepository } from '../domain/campaign.repository';

export interface CampaignRepositoryScope {
    getCampaignRepository(): CampaignRepository;
}
