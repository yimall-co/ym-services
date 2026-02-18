import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { shops } from 'vm/infrastructure/persistence/drizzle/shops.table';

import { providerResources } from './provider-resources.table';
import { capacityResources } from './capacity-resources.table';
import { availabilities } from './availabilities.table';
import { appointments } from './appointments.table';

export const schedulingResources = p.pgTable(
    'scheduling_resources',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        type: p.text('type', {
            enum: ['provider', 'capacity'],
        }).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        shopId: p.uuid('shop_id')
            .notNull()
            .references(() => shops.id),
    },
    (table) => [
        p.index().on(table.type),
    ],
);

export const schedulingResourcesRelations = relations(schedulingResources, ({ one, many }) => ({
    shop: one(shops, {
        fields: [schedulingResources.shopId],
        references: [shops.id],
    }),
    providerResources: many(providerResources),
    capacityResources: many(capacityResources),
    availabilities: many(availabilities),
    appointments: many(appointments),
}));
