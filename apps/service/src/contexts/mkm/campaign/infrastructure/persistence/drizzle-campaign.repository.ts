import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Campaign } from 'mkm/campaign/domain/campaign';
import { CampaignRepository } from 'mkm/campaign/domain/campaign.repository';

import { campaigns } from './drizzle/campaigns.table';
import { DrizzleCampaignMapper } from '../mapper/drizzle-campaign.mapper';

export class DrizzleCampaignRepository
    extends DrizzleRepository<typeof campaigns>
    implements CampaignRepository {
    protected readonly table = campaigns;

    async save(campaign: Campaign): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, ...rest } = DrizzleCampaignMapper.toPersistence(campaign);

            await tx
                .insert(this.table)
                .values(DrizzleCampaignMapper.toPersistence(campaign))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: { ...rest },
                });
        });
    }
}
