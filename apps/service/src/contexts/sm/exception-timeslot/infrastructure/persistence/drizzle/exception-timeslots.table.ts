import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { exceptions } from 'sm/exception/infrastructure/persistence/drizzle/exceptions.table';

export const exceptionTimeSlots = p.pgTable(
    'exception_time_slots',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        startTime: p
            .time('start_time', {
                withTimezone: true,
            })
            .notNull(),
        endTime: p
            .time('end_time', {
                withTimezone: true,
            })
            .notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        exceptionId: p
            .uuid('exception_id')
            .notNull()
            .references(() => exceptions.id),
    },
    (table) => [p.index().on(table.startTime), p.index().on(table.endTime)],
);

export const exceptionTimeSlotsRelations = relations(exceptionTimeSlots, ({ one }) => ({
    exception: one(exceptions, {
        fields: [exceptionTimeSlots.exceptionId],
        references: [exceptions.id],
    }),
}));
