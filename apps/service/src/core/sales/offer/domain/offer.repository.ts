import { OfferId } from 'core/sales/shared/domain/offer-id';

import { Offer } from './offer';

export interface OfferRepository {
    exists(id: OfferId): Promise<boolean>;
    save(offer: Offer): Promise<void>;
    update(offerId: OfferId, offer: Offer): Promise<void>;
    remove(offerId: OfferId): Promise<void>;
}
