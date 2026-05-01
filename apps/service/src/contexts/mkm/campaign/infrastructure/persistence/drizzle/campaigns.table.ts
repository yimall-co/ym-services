import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { workspaces } from 'shared/infrastructure/persistence/drizzle/schema';

import { campaignTypes, CampaignTypes } from 'mkm/campaign/domain/enum/campaign-types';
import { campaignStatuses, CampaignStatuses } from 'mkm/campaign/domain/enum/campaign-statuses';

export const campaigns = p.pgTable(
    'campaigns',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        code: p.text('code').unique().notNull(),
        description: p.text('description').notNull(),
        campaignType: p
            .text('campaign_type', {
                enum: Object.values(campaignTypes) as unknown as [string, ...string[]],
            })
            .$type<CampaignTypes>()
            .notNull(),
        status: p
            .text('status', {
                enum: Object.values(campaignStatuses) as unknown as [string, ...string[]],
            })
            .default(campaignStatuses.ACTIVE)
            .$type<CampaignStatuses>()
            .notNull(),
        startDate: p.timestamp('start_date').defaultNow().notNull(),
        endDate: p.timestamp('end_date').notNull(),
        priority: p.smallint('priority').default(0).notNull(),
        isActive: p.boolean('is_active').default(true).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        workspaceId: p
            .uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id, {
                onUpdate: 'cascade',
                onDelete: 'cascade',
            }),
    },
    (table) => [],
);

export const campaignsRelations = relations(campaigns, ({ one }) => ({
    workspace: one(workspaces, {
        fields: [campaigns.workspaceId],
        references: [workspaces.id],
    }),
}));
