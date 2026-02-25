import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { schedules } from 'sm/schedule/infrastructure/persistence/drizzle/schedules.table';

export const scheduleTimeSlots = p.pgTable(
    'schedule_time_slots',
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
        scheduleId: p
            .uuid('schedule_id')
            .notNull()
            .references(() => schedules.id),
    },
    (table) => [p.index().on(table.startTime), p.index().on(table.endTime)],
);

export const scheduleTimeSlotsRelations = relations(scheduleTimeSlots, ({ one }) => ({
    schedule: one(schedules, {
        fields: [scheduleTimeSlots.scheduleId],
        references: [schedules.id],
    }),
}));
