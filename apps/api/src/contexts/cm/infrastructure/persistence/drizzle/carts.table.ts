import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'iam/infrastructure/persistence/drizzle/users.table';

import { cartItems } from './cart-items.table';

export const carts = p.pgTable(
    'carts',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        status: p.text('status', {
            enum: ['open', 'submitted', 'paid'],
        }).default('open'),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: p.text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [
        p.index().on(table.status),
    ],
);

export const cartsRelations = relations(carts, ({ one, many }) => ({
    user: one(users, {
        fields: [carts.userId],
        references: [users.id],
    }),
    items: many(cartItems),
}));
