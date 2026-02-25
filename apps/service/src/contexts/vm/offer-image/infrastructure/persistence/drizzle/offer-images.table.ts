import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { offers } from 'vm/offer/infrastructure/persistence/drizzle/offers.table';

export const offerImages = p.pgTable(
    'offer_images',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        image: p.text('image').notNull(),
        description: p.varchar('description', {
            length: 250,
        }),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        offerId: p
            .uuid('offer_id')
            .notNull()
            .references(() => offers.id),
    },
    (table) => [p.index().on(table.image)],
);

export const offerImagesRelations = relations(offerImages, ({ one }) => ({
    offer: one(offers, {
        fields: [offerImages.offerId],
        references: [offers.id],
    }),
}));
