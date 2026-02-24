import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';
import { offers } from 'vm/offer/infrastructure/persistence/drizzle/offers.table';
import { schedulingResources } from 'bm/scheduling-resources/infrastructure/persistence/drizzle/scheduling-resources.table';

export const waitlists = p.pgTable(
    'waitlists',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        desiredDate: p.date('desired_date').notNull(),
        timeFrom: p.time('time_from', {
            withTimezone: true,
        }).notNull(),
        timeTo: p.time('time_to', {
            withTimezone: true,
        }).notNull(),
        priority: p.smallint('priority').default(0),
        quantity: p.integer('quantity'),
        status: p.text('status', {
            enum: ['pending', 'confirmed', 'canceled', 'completed'],
        }).default('pending').notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        clientId: p.text('client_id')
            .references(() => users.id),
        resourceId: p.uuid('resource_id')
            .notNull()
            .references(() => schedulingResources.id),
        offerId: p.uuid('offer_id')
            .notNull()
            .references(() => offers.id),
    },
    (table) => [
        p.index().on(table.desiredDate),
        p.index().on(table.status),
    ],
);

export const waitlistsRelations = relations(waitlists, ({ one }) => ({
    client: one(users, {
        fields: [waitlists.clientId],
        references: [users.id],
    }),
    resource: one(schedulingResources, {
        fields: [waitlists.resourceId],
        references: [schedulingResources.id],
    }),
    offer: one(offers, {
        fields: [waitlists.offerId],
        references: [offers.id],
    }),
}));
