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
    geolocationUnitOfWorkProvider,
    getGeolocationsByWorkspaceQueryHandlerProvider,
} from './adapters';

@Module({
    controllers: [WorkspaceController],
    providers: [
        geolocationUnitOfWorkProvider,
        workspaceUnitOfWorkProvider,
        workspaceRepositoryProvider,
        workspaceQueryRepositoryProvider,
        getWorkspacesQueryHandlerProvider,
        getWorkspaceByIdQueryHandlerProvider,
        getGeolocationsByWorkspaceQueryHandlerProvider,
        createWorkspaceCommandHandlerProvider,
        updateWorkspaceCommandHandlerProvider,
    ],
    exports: [
        getWorkspacesQueryHandlerProvider,
        getWorkspaceByIdQueryHandlerProvider,
        getGeolocationsByWorkspaceQueryHandlerProvider,
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
