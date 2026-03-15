import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { GetOfferByShopQuery } from './get-offer-by-shop.query';
import { OfferByShopDto } from './get-offer-by-shop.dto';
import { OfferQueryRepository } from '../offer-query.repository';

export class GetOfferByShopQueryHandler implements QueryHandler<
    GetOfferByShopQuery,
    Array<OfferByShopDto>
> {
    constructor(private readonly offerQueryRepository: OfferQueryRepository) { }

    subscribedTo(): Query {
        return GetOfferByShopQuery;
    }

    async handle(query: GetOfferByShopQuery): Promise<OfferByShopDto[]> {
        throw new Error('Method not implemented.');
    }
}
