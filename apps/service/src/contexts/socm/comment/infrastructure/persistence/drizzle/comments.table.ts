import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'shared/infrastructure/persistence/drizzle/schema';

import { CommentTargets, commentTargets } from 'socm/comment/domain/enum/comment-targets';

export const comments = p.pgTable(
    'comments',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        content: p.text('content').notNull(),
        targetId: p.uuid('target_id').notNull(),
        targetType: p
            .text('target_type', {
                enum: Object.values(commentTargets) as [string, ...string[]],
            })
            .$type<CommentTargets>()
            .notNull(),
        isEdited: p.boolean('is_edited').notNull().default(false),
        isVisible: p.boolean('is_visible').notNull().default(true),
        createdAt: p.timestamp('created_at').notNull().defaultNow(),
        updatedAt: p
            .timestamp('updated_at')
            .$onUpdate(() => new Date())
            .notNull()
            .defaultNow(),
        userId: p
            .uuid('user_id')
            .notNull()
            .references(() => users.id),
    },
    (table) => [p.index().on(table.targetId), p.index().on(table.targetType)],
);

export const commentsRelations = relations(comments, ({ one }) => ({
    owner: one(users, {
        fields: [comments.userId],
        references: [users.id],
    }),
}));
