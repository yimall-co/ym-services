import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { shops } from 'vm/shop/infrastructure/persistence/drizzle/shops.table';
import { offers } from 'vm/offer/infrastructure/persistence/drizzle/offers.table';
import { carts } from 'cm/cart/infrastructure/persistence/drizzle/carts.table';
import { cartItemOptions } from 'cm/cart-item-option/infrastructure/persistence/drizzle/cart-item-options.table';

export const cartItems = p.pgTable(
    'cart_items',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        offerTitle: p.text('offer_title').notNull(),
        basePrice: p.numeric('base_price', { precision: 12, scale: 2 })
            .$type<number>()
            .notNull(),
        totalPrice: p.numeric('total_price', { precision: 12, scale: 2 })
            .$type<number>()
            .notNull(),
        quantity: p.integer('quantity').default(1).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        cartId: p.uuid('cart_id')
            .notNull()
            .references(() => carts.id, { onDelete: 'cascade' }),
        offerId: p.uuid('offer_id')
            .references(() => offers.id, { onDelete: 'set null' }),
        shopId: p.uuid('shop_id')
            .references(() => shops.id, { onDelete: 'set null' }),
    },
    (table) => [
        p.index().on(table.offerTitle),
        p.index().on(table.quantity),
    ],
);

export const cartItemsRelations = relations(cartItems, ({ one, many }) => ({
    cart: one(carts, {
        fields: [cartItems.cartId],
        references: [carts.id],
    }),
    offer: one(offers, {
        fields: [cartItems.offerId],
        references: [offers.id],
    }),
    shop: one(shops, {
        fields: [cartItems.shopId],
        references: [shops.id],
    }),
    cartItemOptions: many(cartItemOptions),
}));
