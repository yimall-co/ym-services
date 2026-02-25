import { DynamicModule, Module, NestModule } from '@nestjs/common';

import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import {
    getWorkspacesQueryHandlerProvider,
    workspaceRepositoryProvider,
} from './adapters/workspace.adapter';

@Module({
    controllers: [WorkspaceController],
    providers: [workspaceRepositoryProvider, getWorkspacesQueryHandlerProvider, WorkspaceService],
    exports: [workspaceRepositoryProvider, getWorkspacesQueryHandlerProvider],
})
export class WorkspaceModule implements NestModule {
    static forRoot(): DynamicModule {
        return {
            module: WorkspaceModule,
        };
    }

    configure() { }
}
