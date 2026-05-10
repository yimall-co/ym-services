import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { colors, workspaces } from 'shared/infrastructure/persistence/drizzle/schema';

import { fonts, Font } from 'wm/customization/domain/enum/fonts';
import { SocialMediaPrimitives } from 'wm/customization/domain/value-object/social-media';

export const customizations = p.pgTable(
    'customizations',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        logo: p.text('logo').notNull(),
        fontPrimary: p
            .text('font_primary', {
                enum: Object.values(fonts) as unknown as [string, ...string[]],
            })
            .$type<Font>()
            .default(fonts.MONO)
            .notNull(),
        fontSecondary: p
            .text('font_secondary', {
                enum: Object.values(fonts) as unknown as [string, ...string[]],
            })
            .$type<Font>()
            .default(fonts.SERIF)
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
    colors: many(colors),
}));
