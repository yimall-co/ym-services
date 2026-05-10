import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { customizations, variants } from 'shared/infrastructure/persistence/drizzle/schema';

import { ColorValue } from 'wm/customization-color/domain/enum/color-values';

export const colors = p.pgTable(
    'customization_colors',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        label: p.text('label').notNull(),
        value: p.text('value').$type<ColorValue>().notNull(),
        isDefault: p.boolean('is_default').default(false),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        customizationId: p
            .uuid('customization_id')
            .notNull()
            .references(() => customizations.id),
    },
    (table) => [p.index().on(table.label), p.index().on(table.value)],
);

export const colorsRelations = relations(colors, ({ one, many }) => ({
    customization: one(customizations, {
        fields: [colors.customizationId],
        references: [customizations.id],
    }),
    variants: many(variants),
}));
