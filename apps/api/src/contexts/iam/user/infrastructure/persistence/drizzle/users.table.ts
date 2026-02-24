import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { carts } from 'cm/cart/infrastructure/persistence/drizzle/carts.table';
import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';
import { appointments } from 'bm/appointment/infrastructure/persistence/drizzle/appointments.table';
import { sessions } from 'iam/session/infrastructure/persistence/drizzle/sessions.table';
import { accounts } from 'iam/account/infrastructure/persistence/drizzle/accounts.table';

export const users = p.pgTable(
    'users',
    {
        id: p.text('id').primaryKey(),
        name: p.text('name').notNull(),
        email: p.text('email').notNull(),
        emailVerified: p.boolean('email_verified').default(false).notNull(),
        image: p.text('image'),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        p.index().on(table.name),
        p.uniqueIndex().on(table.email)
    ],
);

export const usersRelations = relations(users, ({ many, }) => ({
    sessions: many(sessions),
    accounts: many(accounts),
    workspaces: many(workspaces),
    carts: many(carts),
    appointments: many(appointments),
}));
