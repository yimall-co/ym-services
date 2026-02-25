import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

export const verifications = p.pgTable(
    'verification',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        identifier: p.text('identifier').notNull(),
        value: p.text('value').notNull(),
        expiresAt: p.timestamp('expires_at').notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [p.index().on(table.identifier)],
);

export const verificationsRelations = relations(verifications, ({}) => ({}));
