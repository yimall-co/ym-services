import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { shops } from 'vm/shop/infrastructure/persistence/drizzle/shops.table';

export const addresses = p.pgTable(
    'addresses',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        street: p.text('street').notNull(),
        number: p.text('number').notNull(),
        complement: p.text('complement'),
        neighborhood: p.text('neighborhood').notNull(),
        city: p.text('city').notNull(),
        state: p.text('state').notNull(),
        country: p.text('country').notNull(),
        postalCode: p.varchar('postal_code', { length: 20 }),
        isOnline: p.boolean('is_online').default(false),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [p.index().on(table.street), p.index().on(table.city), p.index().on(table.country)],
);

export const addressesRelations = relations(addresses, ({ many }) => ({
    shops: many(shops),
}));
