import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { roles } from 'shared/infrastructure/persistence/drizzle/schema';

import { users } from './users.table';

export const userRoles = p.pgTable(
    'user_roles',
    {
        userId: p
            .uuid('user_id')
            .notNull()
            .references(() => users.id),
        roleId: p
            .uuid('role_id')
            .notNull()
            .references(() => roles.id),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [p.primaryKey({ columns: [table.userId, table.roleId] })],
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(users, {
        fields: [userRoles.userId],
        references: [users.id],
    }),
    role: one(roles, {
        fields: [userRoles.roleId],
        references: [roles.id],
    }),
}));
