import { Campaign } from 'core/marketing/campaign/domain/campaign';

import { campaigns } from '../persistence/drizzle/campaigns.table';

export class DrizzleCampaignMapper {
    static toDomain(primitives: typeof campaigns.$inferSelect): Campaign {
        return Campaign.fromPrimitives({
            id: primitives.id,
            name: primitives.name,
            code: primitives.code,
            description: primitives.description,
            type: primitives.campaignType,
            status: primitives.status,
            publicationPeriod: {
                startDate: primitives.startDate,
                endDate: primitives.endDate,
            },
            priority: primitives.priority,
            isActive: primitives.isActive,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            workspaceId: primitives.workspaceId,
        });
    }

    static toPersistence(campaign: Campaign): typeof campaigns.$inferInsert {
        const primitives = campaign.toPrimitives();

        return {
            id: primitives.id,
            name: primitives.name,
            code: primitives.code,
            description: primitives.description,
            campaignType: primitives.type,
            status: primitives.status,
            startDate: primitives.publicationPeriod.startDate,
            endDate: primitives.publicationPeriod.endDate,
            priority: primitives.priority,
            isActive: primitives.isActive,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            workspaceId: primitives.workspaceId,
        };
    }
}
