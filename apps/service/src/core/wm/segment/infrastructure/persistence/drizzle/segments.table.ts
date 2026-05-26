import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';

export const segments = p.pgTable(
    'segments',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        slug: p.text('slug').notNull(),
        description: p.varchar('description', {
            length: 250,
        }),
        isActive: p.boolean('is_active').default(true).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [p.index().on(table.name), p.uniqueIndex().on(table.slug)],
);

export const segmentsRelations = relations(segments, ({ many }) => ({
    workspaces: many(workspaces),
}));
