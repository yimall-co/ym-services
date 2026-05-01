import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CampaignRepository } from 'mkm/campaign/domain/campaign.repository';
import { CampaignRepositoryScope } from 'mkm/campaign/application/campaign.repository-scope';

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
