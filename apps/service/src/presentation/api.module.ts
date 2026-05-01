import { Global, Module } from '@nestjs/common';

import {
    commandBusProvider,
    commandHandlersProvider,
    eventBusProvider,
    eventSubscribersProvider,
    queryBusProvider,
    queryHandlersProvider,
} from './shared/adapters';

import { IdentityAccessManagementModule } from './iam/iam.module';
import { SocialManagementModule } from './socm/socm.module';
import { VenueManagementModule } from './vm/vm.module';
import { WorkspaceManagementModule } from './wm/wm.module';

@Global()
@Module({
    imports: [
        IdentityAccessManagementModule,
        SocialManagementModule,
        VenueManagementModule,
        WorkspaceManagementModule,
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
export class ApiModule { }
