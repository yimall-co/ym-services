import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { cartItemOptions } from 'cm/cart-item-option/infrastructure/persistence/drizzle/cart-item-options.table';

import { options } from 'vm/option/infrastructure/persistence/drizzle/options.table';
import { offerOptionGroups } from 'vm/offer-option-group/infrastructure/persistence/drizzle/offer-option-groups.table';

export const optionGroups = p.pgTable(
    'option_groups',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        description: p.varchar('description', {
            length: 500,
        }),
        required: p.boolean('required').default(false),
        min: p.smallint('min').default(0).notNull(),
        max: p.smallint('max').default(1).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        p.index().on(table.name),
    ],
);

export const optionGroupsRelations = relations(optionGroups, ({ many }) => ({
    offers: many(offerOptionGroups),
    options: many(options),
    cartItemOptions: many(cartItemOptions),
}));
