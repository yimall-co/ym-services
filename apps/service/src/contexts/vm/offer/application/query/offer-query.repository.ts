import { ShopId } from 'vm/shared/domain/shop-id';

import { OfferByShopDto } from './get-offer-by-shop/get-offer-by-shop.dto';

export interface OfferQueryRepository {
    findAllByShopId(
        shopId: ShopId,
        criteria: { cursor?: { updatedAt: Date; id: string }; limit?: number },
    ): Promise<Array<OfferByShopDto>>;
}
