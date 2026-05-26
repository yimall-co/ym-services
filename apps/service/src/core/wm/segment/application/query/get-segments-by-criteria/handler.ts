import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { SegmentByCriteriaDto } from './dto';
import { GetSegmentsByCriteriaQuery } from './query';
import { SegmentQueryRepository, PaginatedSegment } from '../segment-query.repository';

export class GetSegmentsByCriteriaQueryHandler implements QueryHandler<
    GetSegmentsByCriteriaQuery,
    PaginatedSegment<SegmentByCriteriaDto>
> {
    constructor(private readonly segmentQueryRepository: SegmentQueryRepository) { }

    subscribedTo(): Query {
        return GetSegmentsByCriteriaQuery;
    }

    async handle(query: GetSegmentsByCriteriaQuery) {
        const pagination = await this.segmentQueryRepository.findAll({
            limit: query.limit,
            cursor: { id: query.id, updatedAt: query.updatedAt },
        });

        return pagination;
    }
}
