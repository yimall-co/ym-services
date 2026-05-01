import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { campaigns } from 'mkm/campaign/infrastructure/persistence/drizzle/campaigns.table';

export const campaignItems = p.pgTable(
    'campaign_items',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        title: p.text('title').notNull(),
        subtitle: p.text('subtitle'),
        description: p.varchar('description', {
            length: 2000,
        }),
        itemType: p
            .text('item_type', {
                enum: [''],
            })
            .notNull(),
        targetType: p
            .text('target_type', {
                enum: [''],
            })
            .notNull(),
        targetId: p.uuid('target_id').notNull(),
        imageUrl: p.text('image_url').notNull(),
        mobileImageUrl: p.text('mobile_image_url'),
        backgroundColor: p.text('background_color'),
        ctaText: p.text('cta_text'),
        ctaUrl: p.text('cta_url'),
        startDate: p.timestamp('start_date').defaultNow().notNull(),
        endDate: p.timestamp('end_date').notNull(),
        priority: p.smallint('priority').default(0).notNull(),
        isActive: p.boolean('is_active').default(true).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .$onUpdate(() => new Date())
            .defaultNow()
            .notNull(),
        campaignId: p
            .uuid('campaign_id')
            .notNull()
            .references(() => campaigns.id),
    },
    (table) => [
        p.index().on(table.title),
        p.index().on(table.itemType),
        p.index().on(table.targetType),
        p.index().on(table.targetId),
        p.index().on(table.startDate),
        p.index().on(table.endDate),
    ],
);

export const campaignItemsRelations = relations(campaignItems, ({ one }) => ({
    campaign: one(campaigns, {
        fields: [campaignItems.campaignId],
        references: [campaigns.id],
    }),
}));
