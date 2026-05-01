import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'shared/infrastructure/persistence/drizzle/schema';

import { ReactionTypes, reactionTypes } from 'socm/reaction/domain/enum/reaction-types';
import { ReactionTargets, reactionTargets } from 'socm/reaction/domain/enum/reaction-targets';

export const reactions = p.pgTable(
    'reactions',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        type: p
            .text('type', {
                enum: Object.values(reactionTypes) as [string, ...string[]],
            })
            .default(reactionTypes.LIKE)
            .$type<ReactionTypes>()
            .notNull(),
        targetId: p.uuid('target_id').notNull(),
        targetType: p
            .text('target_type', {
                enum: Object.values(reactionTargets) as [string, ...string[]],
            })
            .$type<ReactionTargets>()
            .notNull(),
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

export const reactionsRelations = relations(reactions, ({ one }) => ({
    user: one(users, {
        fields: [reactions.userId],
        references: [users.id],
    }),
}));
