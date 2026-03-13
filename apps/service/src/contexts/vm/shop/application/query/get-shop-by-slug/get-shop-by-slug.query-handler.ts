import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { ShopBySlugDto } from './get-shop-by-slug.dto';
import { GetShopBySlugQuery } from './get-shop-by-slug.query';
import { ShopQueryRepository } from '../shop-query.repository';

export class GetShopBySlugQueryHandler implements QueryHandler<GetShopBySlugQuery, ShopBySlugDto> {
    constructor(private readonly shopQueryRepository: ShopQueryRepository) { }

    subscribedTo(): Query {
        return GetShopBySlugQuery;
    }

    async handle(query: GetShopBySlugQuery): Promise<ShopBySlugDto> {
        const shop = await this.shopQueryRepository.findOneBySlug(query.slug, query.workspace);
        if (!shop) {
            throw new Error(`Shop by slug ${query.slug} not found`);
        }

        return shop;
    }
}
