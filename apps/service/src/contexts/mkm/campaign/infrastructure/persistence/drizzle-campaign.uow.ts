import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { CampaignRepositoryScope } from 'mkm/campaign/application/campaign.repository-scope';

import { DrizzleCampaignRepositoryScope } from './drizzle-campaign.repository-scope';

export class DrizzleCampaignUnitOfWork implements UnitOfWork<CampaignRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            Schema
        >,
    ) { }

    withTransaction<T>(fn: (scope: CampaignRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleCampaignRepositoryScope(this.db);
            const result = await fn(scope);

            return result;
        });
    }
}
