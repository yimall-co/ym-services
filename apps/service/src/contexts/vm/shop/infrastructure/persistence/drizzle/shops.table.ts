import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';
import { schedules } from 'sm/schedule/infrastructure/persistence/drizzle/schedules.table';
import { exceptions } from 'sm/exception/infrastructure/persistence/drizzle/exceptions.table';
import { cartItems } from 'cm/cart-item/infrastructure/persistence/drizzle/cart-items.table';
import { schedulingResources } from 'bm/scheduling-resources/infrastructure/persistence/drizzle/scheduling-resources.table';
import { addresses } from 'vm/address/infrastructure/persistence/drizzle/addresses.table';
import { geolocations } from 'vm/geolocation/infrastructure/persistence/drizzle/geolocations.table';
import { shopOffers } from 'vm/shop-offer/infrastructure/persistence/drizzle/shop-offers.table';

export const shops = p.pgTable(
    'shops',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        slug: p.text('slug').notNull(),
        description: p.varchar('description', {
            length: 500,
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
        addressId: p
            .uuid('address_id')
            .notNull()
            .references(() => addresses.id),
        geolocationId: p
            .uuid('geolocation_id')
            .notNull()
            .references(() => geolocations.id),
        workspaceId: p
            .uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [p.index().on(table.name), p.index().on(table.slug)],
);

export const shopsRelations = relations(shops, ({ one, many }) => ({
    address: one(addresses, {
        fields: [shops.addressId],
        references: [addresses.id],
    }),
    geolocation: one(geolocations, {
        fields: [shops.geolocationId],
        references: [geolocations.id],
    }),
    workspace: one(workspaces, {
        fields: [shops.workspaceId],
        references: [workspaces.id],
    }),
    offers: many(shopOffers),
    schedules: many(schedules),
    exceptions: many(exceptions),
    cartItems: many(cartItems),
    schedulingResources: many(schedulingResources),
}));
