import { DynamicModule, Module } from '@nestjs/common';

import { WorkspaceModule } from './workspace/workspace.module';
import {
    commandBusProvider,
    commandHandlersProvider,
    queryBusProvider,
    queryHandlersProvider,
} from './shared/adapters';

const workspaceModule = WorkspaceModule.forRoot();

@Module({
    imports: [workspaceModule],
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
