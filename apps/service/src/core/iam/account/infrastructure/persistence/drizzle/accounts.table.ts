import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'shared/infrastructure/persistence/drizzle/schema';

import { AccountProviders, accountProviders } from 'core/iam/account/domain/enum/account-providers';

export const accounts = p.pgTable(
    'accounts',
    {
        id: p.uuid('id').defaultRandom().primaryKey(),
        accountId: p.text('account_id').notNull(),
        provider: p
            .text('provider', {
                enum: Object.values(accountProviders) as [string, ...string[]],
            })
            .$type<AccountProviders>()
            .notNull(),
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
            .uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [p.index().on(table.accountId), p.index().on(table.provider)],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));
