import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { userRoles } from 'iam/user/infrastructure/persistence/drizzle/user-roles.table';

import { rolePermissions } from './role-permissions.table';

export const roles = p.pgTable(
    'roles',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        codeName: p.text('code_name').notNull(),
        description: p
            .varchar('description', {
                length: 255,
            })
            .notNull(),
        version: p.integer('version').default(0).notNull(),
        isActive: p.boolean('is_active').default(true).notNull(),
        isRemoved: p.boolean('is_removed').default(false).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [p.index().on(table.name), p.uniqueIndex().on(table.codeName)],
);

export const rolesRelations = relations(roles, ({ many }) => ({
    users: many(userRoles),
    permissions: many(rolePermissions),
}));
