import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from 'shared/infrastructure/persistence/drizzle/schema';

import { Gender } from 'iam/profiles/domain/value-object/profile-gender';
import { Pronoun } from 'iam/profiles/domain/value-object/profile-pronoun';

export const profiles = p.pgTable(
    'profiles',
    {
        id: p.uuid('id').defaultRandom().primaryKey(),
        gender: p
            .text('gender', {
                enum: ['male', 'female', 'other'],
            })
            .$type<Gender>(),
        customGender: p.text('custom_gender'),
        pronouns: p
            .text('pronoun', {
                enum: ['he/him', 'she/her', 'they/them', 'other'],
            })
            .$type<Pronoun>(),
        customPronouns: p.text('custom_pronouns'),
        birthdate: p.date('birthdate'),
        newsLetter: p.boolean('news_letter').default(false).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: p
            .uuid('user_id')
            .references(() => users.id)
            .notNull(),
    },
    (table) => [],
);

export const profilesRelations = relations(profiles, ({ one }) => ({
    user: one(users, {
        fields: [profiles.userId],
        references: [users.id],
    }),
}));
