import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { offers } from 'vm/infrastructure/persistence/drizzle/offers.table';
import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';

import { categories } from './categories.table';

export const subcategories = p.pgTable(
    'subcategories',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        label: p.text('label').notNull(),
        slug: p.text('slug').notNull(),
        description: p.varchar('description', {
            length: 500,
        }),
        position: p.smallint('position').default(0),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        categoryId: p.uuid('category_id')
            .notNull()
            .references(() => categories.id),
        workspaceId: p.uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [
        p.index().on(table.label),
        p.index().on(table.slug),
    ],
);

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
    workspace: one(workspaces, {
        fields: [subcategories.workspaceId],
        references: [workspaces.id],
    }),
    category: one(categories, {
        fields: [subcategories.categoryId],
        references: [categories.id],
    }),
    offers: many(offers),
}));
