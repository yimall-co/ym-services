import * as p from 'drizzle-orm/pg-core';

import { sql, relations } from 'drizzle-orm';

import { schedulingResources } from 'bm/scheduling-resources/infrastructure/persistence/drizzle/scheduling-resources.table';

export const availabilities = p.pgTable(
    'availabilities',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        weekday: p.smallint('weekday').notNull(),
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
        resourceId: p
            .uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
    },
    (table) => [
        p.index().on(table.weekday),
        p.index().on(table.startTime),
        p.index().on(table.endTime),
        p.check('weekday_range', sql`${table.weekday} BETWEEN 0 AND 6`),
    ],
);

export const availabilitiesRelations = relations(availabilities, ({ one }) => ({
    resource: one(schedulingResources, {
        fields: [availabilities.resourceId],
        references: [schedulingResources.id],
    }),
}));
