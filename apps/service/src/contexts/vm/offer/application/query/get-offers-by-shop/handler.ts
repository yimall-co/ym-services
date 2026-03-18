import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { ShopId } from 'vm/shared/domain/shop-id';

import { OfferByShopDto } from './dto';
import { GetOffersByShopQuery } from './query';
import { OfferQueryRepository, PaginatedOffer } from '../offer-query.repository';

export class GetOffersByShopQueryHandler implements QueryHandler<
    GetOffersByShopQuery,
    PaginatedOffer<OfferByShopDto>
> {
    constructor(private readonly offerQueryRepository: OfferQueryRepository) { }

    subscribedTo(): Query {
        return GetOffersByShopQuery;
    }

    async handle(query: GetOffersByShopQuery) {
        const shopId = new ShopId(query.shopId);

        const pagination = await this.offerQueryRepository.findAllByShopId({
            shopId,
            limit: query.limit,
            cursor: { id: query.id, updatedAt: query.updatedAt },
        });

        return pagination;
    }
}
