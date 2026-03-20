import { DynamicModule, Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {
    addPermissionToRoleCommandHandlerProvider,
    createRoleCommandHandlerProvider,
    roleUnitOfWorkProvider,
    updateRoleCommandHandlerProvider,
} from './adapters';

@Module({
    controllers: [RoleController],
    providers: [
        RoleService,
        roleUnitOfWorkProvider,
        createRoleCommandHandlerProvider,
        updateRoleCommandHandlerProvider,
        addPermissionToRoleCommandHandlerProvider,
    ],
    exports: [
        createRoleCommandHandlerProvider,
        updateRoleCommandHandlerProvider,
        addPermissionToRoleCommandHandlerProvider,
    ],
})
export class RoleModule {
    static forRoot(): DynamicModule {
        return {
            module: RoleModule,
        };
    }
}
