import { Module } from '@nestjs/common';

import { WorkspaceController } from './workspace.controller';
import { WorkspaceAdapterModule } from './adapters/workspace-adapter.module';

@Module({
    controllers: [WorkspaceController],
    imports: [WorkspaceAdapterModule],
    exports: [WorkspaceAdapterModule],
})
export class WorkspaceModule { }
