import { DynamicModule, Module } from '@nestjs/common';

import { WorkspaceModule } from './workspace/workspace.module';

const workspaceModule = WorkspaceModule.forRoot();

@Module({
    imports: [workspaceModule],
})
export class ApiModule {
    static forRoot(): DynamicModule {
        return {
            module: ApiModule,
        };
    }
}
