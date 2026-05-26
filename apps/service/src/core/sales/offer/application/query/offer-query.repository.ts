import { OfferBySlugDto } from './get-offer-by-slug/dto';
import { OfferByShopDto } from './get-offers-by-shop/dto';
import { OfferByWorkspaceDto } from './get-offers-by-workspace/dto';

export interface PaginatedOffer<T> {
    results: Array<T>;
    hasNextPage: boolean;
    lastItem: T | null;
}

export interface OfferQueryRepository {
    findBySlug(slug: string): Promise<OfferBySlugDto | null>;
    findAllByShopId(criteria: {
        shopId: string;
        limit?: number;
        cursor?: { id: string; updatedAt: Date };
    }): Promise<PaginatedOffer<OfferByShopDto>>;
    findAllByWorkspaceId(criteria: {
        workspaceId: string;
        limit?: number;
        cursor?: { id: string; updatedAt: Date };
    }): Promise<PaginatedOffer<OfferByWorkspaceDto>>;
}
