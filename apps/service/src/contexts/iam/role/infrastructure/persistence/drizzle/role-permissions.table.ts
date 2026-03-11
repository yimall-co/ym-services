import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { roles } from 'iam/role/infrastructure/persistence/drizzle/roles.table';
import { permissions } from 'iam/permission/infrastructure/persistence/drizzle/permissions.table';

export const rolePermissions = p.pgTable(
    'role_permissions',
    {
        roleId: p
            .uuid('role_id')
            .notNull()
            .references(() => roles.id),
        permissionId: p
            .uuid('permission_id')
            .notNull()
            .references(() => permissions.id),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [p.primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
    role: one(roles, {
        fields: [rolePermissions.roleId],
        references: [roles.id],
    }),
    permission: one(permissions, {
        fields: [rolePermissions.permissionId],
        references: [permissions.id],
    }),
}));
