import { Campaign } from './campaign';

export interface CampaignRepository {
    save(campaign: Campaign): Promise<void>;
}
