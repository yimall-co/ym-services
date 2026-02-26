import { DynamicModule, Module, NestModule } from '@nestjs/common';

import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import {
    createWorkspaceCommandHandlerProvider,
    getWorkspaceByIdQueryHandlerProvider,
    getWorkspacesQueryHandlerProvider,
    workspaceRepositoryProvider,
} from './adapters';

@Module({
    controllers: [WorkspaceController],
    providers: [
        WorkspaceService,
        workspaceRepositoryProvider,
        getWorkspacesQueryHandlerProvider,
        getWorkspaceByIdQueryHandlerProvider,
        createWorkspaceCommandHandlerProvider,
    ],
    exports: [
        getWorkspacesQueryHandlerProvider,
        getWorkspaceByIdQueryHandlerProvider,
        createWorkspaceCommandHandlerProvider,
    ],
})
export class WorkspaceModule implements NestModule {
    static forRoot(): DynamicModule {
        return {
            module: WorkspaceModule,
        };
    }

    configure() { }
}
