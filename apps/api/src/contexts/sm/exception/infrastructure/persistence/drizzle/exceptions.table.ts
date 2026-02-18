import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { shops } from 'vm/infrastructure/persistence/drizzle/shops.table';

import { exceptionTimeSlots } from './exception-timeslots.table';

export const exceptions = p.pgTable(
    'exceptions',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        date: p.timestamp('date').notNull(),
        reason: p.varchar('reason', {
            length: 500,
        }),
        isClosed: p.boolean('is_closed').default(false),
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
        p.index().on(table.date),
    ]
);

export const exceptionsRelations = relations(exceptions, ({ one, many }) => ({
    shop: one(shops, {
        fields: [exceptions.shopId],
        references: [shops.id],
    }),
    timeSlots: many(exceptionTimeSlots),
}));
