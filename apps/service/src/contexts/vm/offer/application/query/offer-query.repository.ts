import { ShopId } from 'vm/shared/domain/shop-id';

import { OfferBySlugDto } from './get-offer-by-slug/dto';
import { OfferByShopDto } from './get-offers-by-shop/dto';

export interface PaginatedOffer<T> {
    results: Array<T>;
    hasNextPage: boolean;
    lastItem: T | null;
}

export interface OfferQueryRepository {
    findBySlug(slug: string): Promise<OfferBySlugDto | null>;
    findAllByShopId(criteria: {
        shopId: ShopId;
        limit?: number;
        cursor?: { id: string; updatedAt: Date };
    }): Promise<PaginatedOffer<OfferByShopDto>>;
}
