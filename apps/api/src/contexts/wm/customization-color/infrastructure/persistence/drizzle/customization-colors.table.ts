import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { customizations } from 'wm/customization/infrastructure/persistence/drizzle/customizations.table';
import { customizationColorVariants } from 'wm/customization-color-variant/infrastructure/persistence/drizzle/customization-color-variants.table';

export const customizationColors = p.pgTable(
    'customization_colors',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        label: p.text('label').notNull(),
        value: p.text('value').notNull(),
        isDefault: p.boolean('is_default').default(false),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        customizationId: p.uuid('customization_id')
            .notNull()
            .references(() => customizations.id),
    },
    (table) => [
        p.index().on(table.label),
        p.index().on(table.value),
    ],
);

export const customizationColorsRelations = relations(customizationColors, ({ one, many }) => ({
    customization: one(customizations, {
        fields: [customizationColors.customizationId],
        references: [customizations.id],
    }),
    variants: many(customizationColorVariants),
}));
