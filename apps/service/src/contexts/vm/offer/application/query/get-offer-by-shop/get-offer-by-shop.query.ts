import { Query } from 'shared/domain/query';

export class GetOfferByShopQuery extends Query {
    readonly shopId: string;

    constructor(shopId: string) {
        super();

        this.shopId = shopId;
    }
}
