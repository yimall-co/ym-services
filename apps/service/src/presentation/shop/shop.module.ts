import { DynamicModule, Module } from '@nestjs/common';

import { ShopController } from './shop.controller';
import {
    createShopCommandHandlerProvider,
    getShopBySlugQueryHandlerProvider,
    getShopsByWorkspaceQueryHandlerProvider,
    shopQueryRepositoryProvider,
    shopRepositoryProvider,
    shopUnitOfWorkProvider,
} from './adapters';

@Module({
    controllers: [ShopController],
    providers: [
        shopUnitOfWorkProvider,
        shopRepositoryProvider,
        shopQueryRepositoryProvider,
        getShopBySlugQueryHandlerProvider,
        getShopsByWorkspaceQueryHandlerProvider,
        createShopCommandHandlerProvider,
    ],
    exports: [
        getShopBySlugQueryHandlerProvider,
        getShopsByWorkspaceQueryHandlerProvider,
        createShopCommandHandlerProvider,
    ],
})
export class ShopModule {
    static forRoot(): DynamicModule {
        return {
            module: ShopModule,
        };
    }
}
