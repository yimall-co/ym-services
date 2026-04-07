import { DynamicModule, Module } from '@nestjs/common';

import {
    commandBusProvider,
    commandHandlersProvider,
    eventBusProvider,
    eventSubscribersProvider,
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
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProfileModule } from './profile/profile.module';
import { TrackingModule } from './tracking/tracking.module';

const authModule = AuthModule.forRoot();
const userModule = UserModule.forRoot();
const workspaceModule = WorkspaceModule.forRoot();
const segmentModule = SegmentModule.forRoot();
const customizationModule = CustomizationModule.forRoot();
const categoryModule = CategoryModule.forRoot();
const shopModule = ShopModule.forRoot();
const offerModule = OfferModule.forRoot();
const roleModule = RoleModule.forRoot();
const permissionModule = PermissionModule.forRoot();
const profileModule = ProfileModule.forRoot();
const trackingModule = TrackingModule.forRoot();

@Module({
    imports: [
        authModule,
        userModule,
        workspaceModule,
        segmentModule,
        customizationModule,
        categoryModule,
        shopModule,
        offerModule,
        roleModule,
        permissionModule,
        profileModule,
        trackingModule,
    ],
    providers: [
        queryHandlersProvider,
        queryBusProvider,
        commandHandlersProvider,
        commandBusProvider,
        eventSubscribersProvider,
        eventBusProvider,
    ],
    exports: [
        queryHandlersProvider,
        queryBusProvider,
        commandHandlersProvider,
        commandBusProvider,
        eventSubscribersProvider,
        eventBusProvider,
    ],
})
export class ApiModule {
    static forRoot(): DynamicModule {
        return {
            global: true,
            module: ApiModule,
        };
    }
}
