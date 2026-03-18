/* eslint-disable prettier/prettier */
import { eq } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Offer } from 'vm/offer/domain/offer';
import { OfferId } from 'vm/shared/domain/offer-id';
import { OfferRepository } from 'vm/offer/domain/offer.repository';

import { offers } from './drizzle/offers.table';
import { OfferMapper } from '../mapper/offer.mapper';

export class DrizzleOfferRepository
    extends DrizzleRepository<typeof offers>
    implements OfferRepository {
    protected readonly table = offers;

    async save(offer: Offer): Promise<void> {
        await this.client
            .insert(this.table)
            .values(OfferMapper.toPersistence(offer));
    }

    async update(offerId: OfferId, offer: Offer): Promise<void> {
        await this.client
            .update(this.table)
            .set(OfferMapper.toPersistence(offer))
            .where(eq(this.table.id, offerId.value));
    }

    async remove(offerId: OfferId): Promise<void> {
        await this.client
            .update(this.table)
            .set({ isRemoved: true })
            .where(eq(this.table.id, offerId.value));
    }
}
