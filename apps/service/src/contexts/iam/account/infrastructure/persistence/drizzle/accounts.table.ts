import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';

export const accounts = p.pgTable(
    'accounts',
    {
        id: p.text('id').primaryKey(),
        accountId: p.text('account_id').notNull(),
        providerId: p.text('provider_id').notNull(),
        accessToken: p.text('access_token'),
        refreshToken: p.text('refresh_token'),
        idToken: p.text('id_token'),
        accessTokenExpiresAt: p.timestamp('access_token_expires_at'),
        refreshTokenExpiresAt: p.timestamp('refresh_token_expires_at'),
        scope: p.text('scope'),
        password: p.text('password'),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: p
            .text('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [p.index().on(table.accountId), p.index().on(table.providerId)],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));
