/* eslint-disable prettier/prettier */
import { Query } from 'shared/domain/query';

export class GetOffersByShopQuery extends Query {
    readonly shopId: string;
    readonly limit: number;
    readonly updatedAt: Date;
    readonly id: string;

    constructor(
        shopId: string,
        limit: number,
        updatedAt: Date,
        id: string,
    ) {
        super();

        this.shopId = shopId;
        this.limit = limit;
        this.updatedAt = updatedAt;
        this.id = id;
    }
}
