import * as p from 'drizzle-orm/pg-core';

import { sql, relations } from 'drizzle-orm';

import { shops } from 'vm/shop/infrastructure/persistence/drizzle/shops.table';
import { shopOffers } from 'vm/shop-offer/infrastructure/persistence/drizzle/shop-offers.table';
import { offerImages } from 'vm/offer-image/infrastructure/persistence/drizzle/offer-images.table';
import { offerOptionGroups } from 'vm/offer-option-group/infrastructure/persistence/drizzle/offer-option-groups.table';
import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';
import { categories } from 'lm/category/infrastructure/persistence/drizzle/categories.table';
import { subcategories } from 'lm/subcategory/infrastructure/persistence/drizzle/subcategories.table';
import { cartItems } from 'cm/cart-item/infrastructure/persistence/drizzle/cart-items.table';
import { appointments } from 'bm/appointment/infrastructure/persistence/drizzle/appointments.table';

export const offers = p.pgTable(
    'offers',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        type: p
            .text('type', {
                enum: ['product', 'service'],
            })
            .default('product')
            .notNull(),
        schedulingType: p.text('scheduling_type', {
            enum: ['provider', 'capacity'],
        }),
        duration: p.smallint('duration'),
        title: p.text('title').notNull(),
        slug: p.text('slug').notNull(),
        description: p
            .varchar('description', {
                length: 2500,
            })
            .notNull(),
        banner: p.text('banner').notNull(),
        price: p.numeric('price', { precision: 12, scale: 2 }).$type<number>().notNull(),
        stock: p.integer('stock').default(0),
        discount: p.smallint('discount').default(0).notNull(),
        startDate: p.timestamp('start_date').defaultNow().notNull(),
        endDate: p
            .timestamp('end_date')
            .$default(() => new Date(9999, 11, 31))
            .notNull(),
        isActive: p.boolean('is_active').default(true),
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
        subcategoryId: p.uuid('subcategory_id').references(() => subcategories.id),
        shopId: p
            .uuid('shop_id') //TODO: pending to remove?
            .references(() => shops.id),
        workspaceId: p
            .uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [
        p.index().on(table.title),
        p.index().on(table.slug),
        p.index().on(table.startDate),
        p.index().on(table.endDate),
        p.check('discount_range', sql`${table.discount} BETWEEN 0 AND 100`),
    ],
);

export const offersRelations = relations(offers, ({ one, many }) => ({
    category: one(categories, {
        fields: [offers.categoryId],
        references: [categories.id],
    }),
    subcategory: one(subcategories, {
        fields: [offers.subcategoryId],
        references: [subcategories.id],
    }),
    workspace: one(workspaces, {
        fields: [offers.workspaceId],
        references: [workspaces.id],
    }),
    shops: many(shopOffers),
    images: many(offerImages),
    optionGroups: many(offerOptionGroups),
    cartItems: many(cartItems),
    appointments: many(appointments),
}));
