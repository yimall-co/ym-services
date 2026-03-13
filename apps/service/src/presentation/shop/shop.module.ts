import { DynamicModule, Module } from '@nestjs/common';

import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import {
    getShopBySlugQueryHandlerProvider,
    getShopsByWorkspaceQueryHandlerProvider,
    shopQueryRepositoryProvider,
    shopRepositoryProvider,
} from './adapters';

@Module({
    controllers: [ShopController],
    providers: [
        ShopService,
        shopRepositoryProvider,
        shopQueryRepositoryProvider,
        getShopBySlugQueryHandlerProvider,
        getShopsByWorkspaceQueryHandlerProvider,
    ],
    exports: [getShopBySlugQueryHandlerProvider, getShopsByWorkspaceQueryHandlerProvider],
})
export class ShopModule {
    static forRoot(): DynamicModule {
        return {
            module: ShopModule,
        };
    }
}
