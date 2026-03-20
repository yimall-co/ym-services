import { DynamicModule, Module } from '@nestjs/common';

import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { createPermissionCommandHandlerProvider, permissionUnitOfWorkProvider } from './adapters';

@Module({
    controllers: [PermissionController],
    providers: [
        PermissionService,
        permissionUnitOfWorkProvider,
        createPermissionCommandHandlerProvider,
    ],
    exports: [createPermissionCommandHandlerProvider],
})
export class PermissionModule {
    static forRoot(): DynamicModule {
        return {
            module: PermissionModule,
        };
    }
}
