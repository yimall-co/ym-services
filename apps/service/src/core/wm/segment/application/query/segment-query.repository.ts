import { SegmentByCriteriaDto } from './get-segments-by-criteria/dto';

export interface PaginatedSegment<T> {
    results: Array<T>;
    hasNextPage: boolean;
    lastItem: T | null;
}

export interface SegmentQueryRepository {
    findAll(criteria: {
        limit?: number;
        cursor?: { id?: string; updatedAt?: Date };
    }): Promise<PaginatedSegment<SegmentByCriteriaDto>>;
}
