import { DynamicModule, Module } from '@nestjs/common';

import { WorkspaceController } from './workspace.controller';
import {
    workspaceRepositoryProvider,
    workspaceQueryRepositoryProvider,
    createWorkspaceCommandHandlerProvider,
    getWorkspaceByIdQueryHandlerProvider,
    getWorkspacesQueryHandlerProvider,
    updateWorkspaceCommandHandlerProvider,
    workspaceUnitOfWorkProvider,
} from './adapters';

@Module({
    controllers: [WorkspaceController],
    providers: [
        workspaceUnitOfWorkProvider,
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
export class WorkspaceModule {
    static forRoot(): DynamicModule {
        return {
            module: WorkspaceModule,
        };
    }
}
