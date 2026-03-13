import { DynamicModule, Module } from '@nestjs/common';

import {
    commandBusProvider,
    commandHandlersProvider,
    queryBusProvider,
    queryHandlersProvider,
} from './shared/adapters';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { SegmentModule } from './segment/segment.module';
import { CustomizationModule } from './customization/customization.module';
import { OfferModule } from './offer/offer.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';

const authModule = AuthModule.forRoot();
const userModule = UserModule.forRoot();
const workspaceModule = WorkspaceModule.forRoot();
const segmentModule = SegmentModule.forRoot();
const customizationModule = CustomizationModule.forRoot();
const offerModule = OfferModule.forRoot();
const categoryModule = CategoryModule.forRoot();
const shopModule = ShopModule.forRoot();

@Module({
    imports: [
        authModule,
        userModule,
        workspaceModule,
        segmentModule,
        customizationModule,
        offerModule,
        categoryModule,
        shopModule,
    ],
    providers: [
        queryHandlersProvider,
        queryBusProvider,
        commandHandlersProvider,
        commandBusProvider,
    ],
    exports: [queryHandlersProvider, queryBusProvider, commandHandlersProvider, commandBusProvider],
})
export class ApiModule {
    static forRoot(): DynamicModule {
        return {
            global: true,
            module: ApiModule,
        };
    }
}
