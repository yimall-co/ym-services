import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { optionGroups } from 'vm/option-group/infrastructure/persistence/drizzle/option-groups.table';

export const options = p.pgTable(
    'options',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        priceDelta: p
            .numeric('price_delta', { precision: 12, scale: 2 })
            .$type<number>()
            .default(0.0)
            .notNull(),
        isActive: p.boolean('is_active').default(true).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        optionGroupId: p
            .uuid('option_group_id')
            .notNull()
            .references(() => optionGroups.id, { onDelete: 'cascade' }),
    },
    (table) => [p.index().on(table.name)],
);

export const optionsRelations = relations(options, ({ one }) => ({
    optionGroup: one(optionGroups, {
        fields: [options.optionGroupId],
        references: [optionGroups.id],
    }),
}));
