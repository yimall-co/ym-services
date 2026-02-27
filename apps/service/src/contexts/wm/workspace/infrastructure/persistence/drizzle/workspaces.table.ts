import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';
import { shops } from 'vm/shop/infrastructure/persistence/drizzle/shops.table';
import { offers } from 'vm/offer/infrastructure/persistence/drizzle/offers.table';
import { categories } from 'lm/category/infrastructure/persistence/drizzle/categories.table';
import { subcategories } from 'lm/subcategory/infrastructure/persistence/drizzle/subcategories.table';

import { segments } from 'wm/segment/infrastructure/persistence/drizzle/segments.table';
import { customizations } from 'wm/customization/infrastructure/persistence/drizzle/customizations.table';

export const workspaces = p.pgTable(
    'workspaces',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        slug: p.text('slug').notNull(),
        description: p.text('description'),
        tin: p.varchar('tin', {
            length: 15,
        }),
        isVerified: p.boolean('is_verified').notNull().default(false),
        isActive: p.boolean('is_active').notNull().default(true),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        segmentId: p
            .uuid('segment_id')
            .notNull()
            .references(() => segments.id),
        ownerId: p
            .text('owner_id')
            .notNull()
            .references(() => users.id, {
                onUpdate: 'cascade',
                onDelete: 'set null',
            }),
    },
    (table) => [
        p.index().on(table.name),
        p.uniqueIndex().on(table.slug),
        p.uniqueIndex().on(table.tin),
    ],
);

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
    owner: one(users, {
        fields: [workspaces.ownerId],
        references: [users.id],
    }),
    segment: one(segments, {
        fields: [workspaces.segmentId],
        references: [segments.id],
    }),
    customization: one(customizations),
    categories: many(categories),
    subcategories: many(subcategories),
    shops: many(shops),
    offers: many(offers),
}));
