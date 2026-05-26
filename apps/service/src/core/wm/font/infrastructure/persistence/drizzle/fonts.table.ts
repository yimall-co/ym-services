import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { fontCategories, FontCategory } from 'wm/font/domain/enum/font-categories';

export const fonts = p.pgTable(
    'fonts',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        family: p.text('family').unique().notNull(),
        category: p
            .text('category', {
                enum: Object.values(fontCategories) as [string, ...string[]],
            })
            .$type<FontCategory>()
            .notNull(),
        variants: p.text('variants').array().notNull(),
        subsets: p.text('subsets').array().notNull(),
        version: p.text('version').notNull(),
        kind: p.text('kind').notNull(),
        createdAt: p.timestamp('created_at').notNull().defaultNow(),
        updatedAt: p
            .timestamp('updated_at')
            .$onUpdate(() => new Date())
            .notNull()
            .defaultNow(),
    },
    (table) => [
        p.index().on(table.category),
        p.index().on(table.kind),
    ],
);

export const fontsRelations = relations(fonts, ({ }) => ({}));
