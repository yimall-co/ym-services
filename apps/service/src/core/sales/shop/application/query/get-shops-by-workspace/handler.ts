import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { ShopByWorkspaceDto } from './dto';
import { GetShopsByWorkspaceQuery } from './query';
import { ShopQueryRepository } from '../shop-query.repository';

export class GetShopsByWorkspaceQueryHandler implements QueryHandler<
    GetShopsByWorkspaceQuery,
    Array<ShopByWorkspaceDto>
> {
    constructor(private readonly shopQueryRepository: ShopQueryRepository) { }

    subscribedTo(): Query {
        return GetShopsByWorkspaceQuery;
    }

    async handle(query: GetShopsByWorkspaceQuery): Promise<ShopByWorkspaceDto[]> {
        const shops = await this.shopQueryRepository.findAllByWorkspaceId(query.workspaceId);
        return shops;
    }
}
