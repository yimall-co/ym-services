import { DynamicModule, Module, NestModule } from '@nestjs/common';

import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import {
    workspaceRepositoryProvider,
    workspaceQueryRepositoryProvider,
    createWorkspaceCommandHandlerProvider,
    getWorkspaceByIdQueryHandlerProvider,
    getWorkspacesQueryHandlerProvider,
    updateWorkspaceCommandHandlerProvider,
} from './adapters';

@Module({
    controllers: [WorkspaceController],
    providers: [
        WorkspaceService,
        workspaceRepositoryProvider,
        workspaceQueryRepositoryProvider,
        getWorkspacesQueryHandlerProvider,
        getWorkspaceByIdQueryHandlerProvider,
        createWorkspaceCommandHandlerProvider,
        updateWorkspaceCommandHandlerProvider,
    ],
    exports: [
        getWorkspacesQueryHandlerProvider,
        getWorkspaceByIdQueryHandlerProvider,
        createWorkspaceCommandHandlerProvider,
        updateWorkspaceCommandHandlerProvider,
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
