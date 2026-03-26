import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import {
    accounts,
    appointments,
    carts,
    profiles,
    sessions,
    waitlists,
    workspaces,
} from 'shared/infrastructure/persistence/drizzle/schema';

import { userRoles } from './user-roles.table';

export const users = p.pgTable(
    'users',
    {
        id: p.uuid('id').defaultRandom().primaryKey(),
        name: p.text('name').notNull(),
        email: p.text('email').notNull(),
        emailVerified: p.boolean('email_verified').default(false).notNull(),
        image: p.text('image'),
        isActive: p.boolean('is_active').default(true).notNull(),
        isRemoved: p.boolean('is_removed').default(false).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [p.index().on(table.name), p.uniqueIndex().on(table.email)],
);

export const usersRelations = relations(users, ({ one, many }) => ({
    profile: one(profiles),
    roles: many(userRoles),
    sessions: many(sessions),
    accounts: many(accounts),
    workspaces: many(workspaces),
    carts: many(carts),
    appointments: many(appointments),
    waitlists: many(waitlists),
}));
