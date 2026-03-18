/* eslint-disable prettier/prettier */
import { Query } from 'shared/domain/query';

export class GetSegmentsByCriteriaQuery extends Query {
    readonly id?: string;
    readonly limit?: number;
    readonly updatedAt?: Date;

    constructor(
        id?: string,
        limit?: number,
        updatedAt?: Date,
    ) {
        super();

        this.id = id;
        this.limit = limit;
        this.updatedAt = updatedAt;
    }
}
