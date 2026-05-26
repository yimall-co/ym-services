import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CampaignRepository } from 'core/marketing/campaign/domain/campaign.repository';
import { CampaignRepositoryScope } from 'core/marketing/campaign/application/campaign.repository-scope';

import { DrizzleCampaignRepository } from './drizzle-campaign.repository';

export class DrizzleCampaignRepositoryScope implements CampaignRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            Schema
        >,
    ) { }

    getCampaignRepository(): CampaignRepository {
        return new DrizzleCampaignRepository(this.db);
    }
}
