import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { OfferByWorkspaceDto } from './dto';
import { GetOffersByWorkspaceQuery } from './query';
import { OfferQueryRepository, PaginatedOffer } from '../offer-query.repository';

export class GetOffersByWorkspaceQueryHandler implements QueryHandler<
    GetOffersByWorkspaceQuery,
    PaginatedOffer<OfferByWorkspaceDto>
> {
    constructor(private readonly offerQueryRepository: OfferQueryRepository) { }

    subscribedTo(): Query {
        return GetOffersByWorkspaceQuery;
    }

    async handle(query: GetOffersByWorkspaceQuery): Promise<PaginatedOffer<OfferByWorkspaceDto>> {
        const paginatedOffers = await this.offerQueryRepository.findAllByWorkspaceId({
            workspaceId: query.workspaceId,
            limit: query.limit,
            cursor: { id: query.id, updatedAt: query.updatedAt },
        });

        return paginatedOffers;
    }
}
