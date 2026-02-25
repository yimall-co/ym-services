import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { SocialMediaPrimitives } from 'wm/customization/domain/social-media';
import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';
import { customizationColors } from 'wm/customization-color/infrastructure/persistence/drizzle/customization-colors.table';

const fonts = ['Poppins', 'Raleway', 'Inter'] as const;

export const customizations = p.pgTable(
    'customizations',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        logo: p.text('logo').notNull(),
        fontPrimary: p
            .text('font_primary', {
                enum: fonts,
            })
            .default('Poppins')
            .notNull(),
        fontSecondary: p
            .text('font_secondary', {
                enum: fonts,
            })
            .default('Raleway')
            .notNull(),
        showName: p.boolean('show_name').default(false).notNull(),
        socialMedia: p
            .jsonb('social_media')
            .$type<Array<SocialMediaPrimitives>>()
            .default([])
            .notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        workspaceId: p
            .uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [],
);

export const customizationsRelations = relations(customizations, ({ one, many }) => ({
    workspace: one(workspaces, {
        fields: [customizations.workspaceId],
        references: [workspaces.id],
    }),
    colors: many(customizationColors),
}));
