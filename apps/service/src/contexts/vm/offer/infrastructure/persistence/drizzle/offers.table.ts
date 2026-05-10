import * as p from 'drizzle-orm/pg-core';

import { sql, relations } from 'drizzle-orm';

import {
    appointments,
    cartItems,
    categories,
    offerImages,
    offerOptionGroups,
    shopOffers,
    subcategories,
    workspaces,
} from 'shared/infrastructure/persistence/drizzle/schema';

import { OfferTypes, offerTypes } from 'vm/offer/domain/enum/offer-types';
import { SchedulingTypes, schedulingTypes } from 'vm/offer/domain/enum/scheduling-types';

export const offers = p.pgTable(
    'offers',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        type: p
            .text('type', {
                enum: Object.values(offerTypes) as unknown as [string, ...string[]],
            })
            .$type<OfferTypes>()
            .default(offerTypes.PRODUCT)
            .notNull(),
        schedulingType: p
            .text('scheduling_type', {
                enum: Object.values(schedulingTypes) as unknown as [string, ...string[]],
            })
            .$type<SchedulingTypes>()
            .notNull(),
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
        isActive: p.boolean('is_active').default(true).notNull(),
        isRemoved: p.boolean('is_removed').default(false).notNull(),
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
        subcategoryId: p.uuid('subcategory_id').references(() => subcategories.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
        }),
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
