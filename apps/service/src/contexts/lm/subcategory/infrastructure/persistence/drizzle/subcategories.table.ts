import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { categories, offers } from 'shared/infrastructure/persistence/drizzle/schema';

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
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        categoryId: p
            .uuid('category_id')
            .notNull()
            .references(() => categories.id),
    },
    (table) => [p.index().on(table.label), p.index().on(table.slug)],
);

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
    category: one(categories, {
        fields: [subcategories.categoryId],
        references: [categories.id],
    }),
    offers: many(offers),
}));
