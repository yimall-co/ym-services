import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

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

    async handle(query: GetOffersByShopQuery): Promise<PaginatedOffer<OfferByShopDto>> {
        const paginatedOffers = await this.offerQueryRepository.findAllByShopId({
            shopId: query.shopId,
            limit: query.limit,
            cursor: { id: query.id, updatedAt: query.updatedAt },
        });

        return paginatedOffers;
    }
}
