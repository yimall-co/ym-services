import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';
import { offers } from 'vm/offer/infrastructure/persistence/drizzle/offers.table';
import { schedulingResources } from 'bm/scheduling-resources/infrastructure/persistence/drizzle/scheduling-resources.table';

export const appointments = p.pgTable(
    'appointments',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        startAt: p
            .timestamp('start_at', {
                withTimezone: true,
            })
            .notNull(),
        endAt: p
            .timestamp('end_at', {
                withTimezone: true,
            })
            .notNull(),
        status: p
            .text('status', {
                enum: ['pending', 'confirmed', 'canceled', 'completed'],
            })
            .default('pending')
            .notNull(),
        quantity: p.integer('quantity'),
        notes: p.varchar('notes', {
            length: 1000,
        }),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        clientId: p.text('client_id').references(() => users.id),
        resourceId: p
            .uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
        offerId: p
            .uuid('offer_id')
            .notNull()
            .references(() => offers.id),
    },
    (table) => [p.index().on(table.startAt), p.index().on(table.status)],
);

export const appointmentsRelations = relations(appointments, ({ one }) => ({
    client: one(users, {
        fields: [appointments.clientId],
        references: [users.id],
    }),
    resource: one(schedulingResources, {
        fields: [appointments.resourceId],
        references: [schedulingResources.id],
    }),
    offer: one(offers, {
        fields: [appointments.offerId],
        references: [offers.id],
    }),
}));
