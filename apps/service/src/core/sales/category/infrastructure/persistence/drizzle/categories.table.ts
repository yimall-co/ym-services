import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import {
    offers,
    subcategories,
    workspaces,
} from 'shared/infrastructure/persistence/drizzle/schema';

export const categories = p.pgTable(
    'categories',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        label: p.text('label').notNull(), // TODO: change to 'name'.
        slug: p.text('slug').notNull(),
        description: p.varchar('description', {
            length: 500,
        }),
        banner: p.text('banner'),
        position: p.smallint('position').default(0).notNull(),
        isActive: p.boolean('is_active').default(true).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        workspaceId: p
            .uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [p.index().on(table.label), p.index().on(table.slug)],
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    workspace: one(workspaces, {
        fields: [categories.workspaceId],
        references: [workspaces.id],
    }),
    subcategories: many(subcategories),
    offers: many(offers),
}));
