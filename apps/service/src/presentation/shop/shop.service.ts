import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { ShopBySlugDto } from 'vm/shop/application/query/get-shop-by-slug/get-shop-by-slug.dto';
import { GetShopBySlugQuery } from 'vm/shop/application/query/get-shop-by-slug/get-shop-by-slug.query';
import { ShopByWorkspaceDto } from 'vm/shop/application/query/get-shops-by-workspace/get-shops-by-workspace.dto';
import { GetShopsByWorkspaceQuery } from 'vm/shop/application/query/get-shops-by-workspace/get-shops-by-workspace.query';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

@Injectable()
export class ShopService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getShopBySlug(slug: string, workspaceId: string | null) {
        const query = new GetShopBySlugQuery(slug, workspaceId);
        return await this.queryBus.ask<ShopBySlugDto>(query);
    }

    async getShopsByWorkspace(workspaceId: string) {
        const query = new GetShopsByWorkspaceQuery(workspaceId);
        return await this.queryBus.ask<Array<ShopByWorkspaceDto>>(query);
    }
}
