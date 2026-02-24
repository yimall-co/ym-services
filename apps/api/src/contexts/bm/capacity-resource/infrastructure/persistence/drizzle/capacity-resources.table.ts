import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { schedulingResources } from 'bm/scheduling-resources/infrastructure/persistence/drizzle/scheduling-resources.table';

export const capacityResources = p.pgTable(
    'capacity_resources',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        capacity: p.integer('capacity').default(1).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        resourceId: p.uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
    },
    (table) => [],
);

export const capacityResourcesRelations = relations(capacityResources, ({ one }) => ({
    resource: one(schedulingResources, {
        fields: [capacityResources.resourceId],
        references: [schedulingResources.id],
    }),
}));
