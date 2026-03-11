import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { rolePermissions } from 'iam/role/infrastructure/persistence/drizzle/role-permissions.table';

export const permissions = p.pgTable(
    'permissions',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        codeName: p.text('code_name').notNull(),
        description: p
            .varchar('description', {
                length: 255,
            })
            .notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [p.index().on(table.name), p.uniqueIndex().on(table.codeName)],
);

export const permissionsRelations = relations(permissions, ({ many }) => ({
    roles: many(rolePermissions),
}));

