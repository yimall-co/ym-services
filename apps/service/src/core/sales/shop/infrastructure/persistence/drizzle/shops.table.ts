import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import {
    workspaces,
    geolocations,
    shopOffers,
    schedules,
    exceptions,
    cartItems,
    schedulingResources,
} from 'shared/infrastructure/persistence/drizzle/schema';

export const shops = p.pgTable(
    'shops',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        slug: p.text('slug').notNull(),
        description: p.varchar('description', {
            length: 2000,
        }),
        banner: p.text('banner'),
        phone: p.varchar('phone', { length: 15 }),
        isPrimary: p.boolean('is_primary').default(false).notNull(),
        isVerified: p.boolean('is_verified').default(false).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        workspaceId: p
            .uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [p.index().on(table.name), p.index().on(table.slug)],
);

export const shopsRelations = relations(shops, ({ one, many }) => ({
    workspace: one(workspaces, {
        fields: [shops.workspaceId],
        references: [workspaces.id],
    }),
    geolocation: one(geolocations),
    offers: many(shopOffers),
    schedules: many(schedules),
    exceptions: many(exceptions),
    cartItems: many(cartItems),
    schedulingResources: many(schedulingResources),
}));
