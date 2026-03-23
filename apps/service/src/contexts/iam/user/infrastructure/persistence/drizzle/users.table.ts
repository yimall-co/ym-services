import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { carts } from 'cm/cart/infrastructure/persistence/drizzle/carts.table';
import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';
import { sessions } from 'iam/session/infrastructure/persistence/drizzle/sessions.table';
import { accounts } from 'iam/account/infrastructure/persistence/drizzle/accounts.table';
import { appointments } from 'bm/appointment/infrastructure/persistence/drizzle/appointments.table';
import { waitlists } from 'bm/waitlist/infrastructure/persistence/drizzle/waitlists.table';

import { userRoles } from './user-roles.table';

export const users = p.pgTable(
    'users',
    {
        id: p.uuid('id').defaultRandom().primaryKey(),
        name: p.text('name').notNull(),
        email: p.text('email').notNull(),
        emailVerified: p.boolean('email_verified').default(false).notNull(),
        image: p.text('image'),
        // TODO: add birthDate and gender, possible to use enum for gender and new profile table.
        // birthDate: p.date('birth_date'),
        // gender: p.text('gender'), // male, female, prefer not to say, other.
        // customGender: p.text('custom_gender'),
        // pronouns: p.text('pronouns'), // she/her, he/him, they/them, other.
        // customPronouns: p.text('custom_pronouns'),
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

export const usersRelations = relations(users, ({ many }) => ({
    roles: many(userRoles),
    sessions: many(sessions),
    accounts: many(accounts),
    workspaces: many(workspaces),
    carts: many(carts),
    appointments: many(appointments),
    waitlists: many(waitlists),
}));
