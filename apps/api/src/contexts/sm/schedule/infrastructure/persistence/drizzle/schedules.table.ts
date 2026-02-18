import * as p from 'drizzle-orm/pg-core';

import { sql, relations } from 'drizzle-orm';

import { shops } from 'vm/infrastructure/persistence/drizzle/shops.table';

import { scheduleTimeSlots } from './schedules-timeslots.table';

export const schedules = p.pgTable(
    'schedules',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        dayOfWeek: p.smallint('day_of_week').notNull(),
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
        p.index().on(table.dayOfWeek),
        p.check('day_of_week_range', sql`${table.dayOfWeek} BETWEEN 0 AND 6`),
    ],
);

export const schedulesRelations = relations(schedules, ({ one, many }) => ({
    shop: one(shops, {
        fields: [schedules.shopId],
        references: [shops.id],
    }),
    timeSlots: many(scheduleTimeSlots),
}));
