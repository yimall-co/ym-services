import * as p from 'drizzle-orm/pg-core';

import { sql, relations } from 'drizzle-orm';

import { shops } from 'shared/infrastructure/persistence/drizzle/schema';

export const geolocations = p.pgTable(
    'geolocations',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        latitude: p.numeric('latitude', { precision: 9, scale: 6 }).$type<number>().notNull(),
        longitude: p.numeric('longitude', { precision: 9, scale: 6 }).$type<number>().notNull(),
        accuracy: p.smallint('accuracy').default(5),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        shopId: p
            .uuid('shop_id')
            .notNull()
            .references(() => shops.id),
    },
    (table) => [
        p.index().on(table.latitude),
        p.index().on(table.longitude),
        p.check('latitude_range', sql`${table.latitude} BETWEEN -90 AND 90`),
        p.check('longitude_range', sql`${table.longitude} BETWEEN -180 AND 180`),
    ],
);

export const geolocationsRelations = relations(geolocations, ({ one }) => ({
    shop: one(shops, {
        fields: [geolocations.shopId],
        references: [shops.id],
    }),
}));
