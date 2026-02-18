import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { shops } from 'vm/shop/infrastructure/persistence/drizzle/shops.table';
import { offers } from 'vm/offer/infrastructure/persistence/drizzle/offers.table';

export const shopOffers = p.pgTable(
    'shop_offers',
    {
        shopId: p.uuid('shop_id')
            .notNull()
            .references(() => shops.id),
        offerId: p.uuid('offer_id')
            .notNull()
            .references(() => offers.id),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        p.primaryKey({
            columns: [
                table.shopId,
                table.offerId
            ]
        }),
    ],
);

export const shopOffersRelations = relations(shopOffers, ({ one }) => ({
    shop: one(shops, {
        fields: [shopOffers.shopId],
        references: [shops.id],
    }),
    offer: one(offers, {
        fields: [shopOffers.offerId],
        references: [offers.id],
    }),
}));
