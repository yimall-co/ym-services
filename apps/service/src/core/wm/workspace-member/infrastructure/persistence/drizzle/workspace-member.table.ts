import { relations } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { roles, users, workspaces } from 'shared/infrastructure/persistence/drizzle/schema';

export const workspaceMembers = p.pgTable(
    'workspace_members',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        workspaceId: p.uuid('workspace_id').notNull(),
        userId: p.uuid('user_id').notNull(),
        roleId: p.uuid('role_id').notNull(),
        joinedAt: p.timestamp('joined_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at').defaultNow().notNull(),
        isActive: p.boolean('is_active').default(true).notNull(),
    },
    (table) => [
        p.index().on(table.workspaceId),
        p.index().on(table.userId),
        p.uniqueIndex().on(table.workspaceId, table.userId),
    ],
);

export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
    workspace: one(workspaces, {
        fields: [workspaceMembers.workspaceId],
        references: [workspaces.id],
    }),
    user: one(users, {
        fields: [workspaceMembers.userId],
        references: [users.id],
    }),
    role: one(roles, {
        fields: [workspaceMembers.roleId],
        references: [roles.id],
    }),
}));