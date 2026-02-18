import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { schedulingResources } from './scheduling-resources.table';

export const providerResources = p.pgTable(
    'provider_resources',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        providerId: p.uuid('provider_id'),
        resourceId: p.uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
    },
    (table) => [],
);

export const providerResourcesRelations = relations(providerResources, ({ one }) => ({
    resource: one(schedulingResources, {
        fields: [providerResources.resourceId],
        references: [schedulingResources.id],
    }),
}));
