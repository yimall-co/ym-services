import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { options } from 'core/sales/option/infrastructure/persistence/drizzle/options.table';
import { optionGroups } from 'core/sales/option-group/infrastructure/persistence/drizzle/option-groups.table';
import { cartItems } from 'core/billing/cart-item/infrastructure/persistence/drizzle/cart-items.table';

export const cartItemOptions = p.pgTable(
    'cart_item_options',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        optionGroupName: p.text('option_group_name').notNull(),
        optionName: p.text('option_name').notNull(),
        price: p.numeric('price', { precision: 12, scale: 2 }).$type<number>().notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        cartItemId: p
            .uuid('cart_item_id')
            .notNull()
            .references(() => cartItems.id, { onDelete: 'cascade' }),
        optionGroupId: p
            .uuid('option_group_id')
            .notNull()
            .references(() => optionGroups.id, { onDelete: 'set null' }),
        optionId: p
            .uuid('option_id')
            .notNull()
            .references(() => options.id, { onDelete: 'set null' }),
    },
    (table) => [p.index().on(table.optionName), p.index().on(table.price)],
);

export const cartItemOptionsRelations = relations(cartItemOptions, ({ one }) => ({
    cartItem: one(cartItems, {
        fields: [cartItemOptions.cartItemId],
        references: [cartItems.id],
    }),
    optionGroup: one(optionGroups, {
        fields: [cartItemOptions.optionGroupId],
        references: [optionGroups.id],
    }),
    option: one(options, {
        fields: [cartItemOptions.optionId],
        references: [options.id],
    }),
}));
