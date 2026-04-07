import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { ShopNotFound } from 'vm/shop/domain/error/shop-not-found';

import { ShopBySlugDto } from './dto';
import { GetShopBySlugQuery } from './query';
import { ShopQueryRepository } from '../shop-query.repository';

export class GetShopBySlugQueryHandler implements QueryHandler<GetShopBySlugQuery, ShopBySlugDto> {
    constructor(private readonly shopQueryRepository: ShopQueryRepository) { }

    subscribedTo(): Query {
        return GetShopBySlugQuery;
    }

    async handle(query: GetShopBySlugQuery): Promise<ShopBySlugDto> {
        const shop = await this.shopQueryRepository.findOneBySlug(query.slug, query.workspace);
        if (!shop) {
            throw new ShopNotFound();
        }

        return shop;
    }
}
