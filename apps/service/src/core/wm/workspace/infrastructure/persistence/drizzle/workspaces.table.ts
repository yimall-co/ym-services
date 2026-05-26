import * as p from 'drizzle-orm/pg-core';

import { relations, sql } from 'drizzle-orm';

import {
    categories,
    customizations,
    offers,
    segments,
    shops,
    subcategories,
    users,
    visits,
} from 'shared/infrastructure/persistence/drizzle/schema';

export const workspaces = p.pgTable(
    'workspaces',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        slug: p.text('slug').notNull(),
        description: p
            .varchar('description', {
                length: 1000,
            })
            .notNull(),
        tin: p.varchar('tin', {
            length: 15,
        }),
        version: p
            .integer('version')
            .notNull()
            .default(0)
            .$onUpdateFn(() => sql`version + 1`),
        isVerified: p.boolean('is_verified').notNull().default(false),
        isRemoved: p.boolean('is_removed').notNull().default(false),
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
            .uuid('owner_id')
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
    shops: many(shops),
    offers: many(offers),
    visits: many(visits),
}));
