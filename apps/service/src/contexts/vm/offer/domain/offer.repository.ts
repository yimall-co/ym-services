import { OfferId } from 'vm/shared/domain/offer-id';

import { Offer } from './offer';

export interface OfferRepository {
    save(offer: Offer): Promise<void>;
    update(offerId: OfferId, offer: Offer): Promise<void>;
    delete(offerId: OfferId): Promise<void>;
}
