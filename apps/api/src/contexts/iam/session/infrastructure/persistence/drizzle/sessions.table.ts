import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';

export const sessions = p.pgTable(
    'sessions',
    {
        id: p.text('id').primaryKey(),
        expiresAt: p.timestamp('expires_at').notNull(),
        token: p.text('token').unique().notNull(),
        ipAddress: p.text("ip_address"),
        userAgent: p.text("user_agent"),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: p.text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [
        p.index().on(table.userId),
    ],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));
