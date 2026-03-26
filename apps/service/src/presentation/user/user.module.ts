import { DynamicModule, Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
    addRoleToUserCommandHandlerProvider,
    getUserByIdQueryHandlerProvider,
    getUserInfoByIdQueryHandlerProvider,
    getWorkspacesByOwnerIdQueryHandlerProvider,
    userUnitOfWorkProvider,
    workspaceUnitOfWorkProvider,
} from './adapters';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        userUnitOfWorkProvider,
        workspaceUnitOfWorkProvider,
        getUserByIdQueryHandlerProvider,
        getUserInfoByIdQueryHandlerProvider,
        getWorkspacesByOwnerIdQueryHandlerProvider,
        addRoleToUserCommandHandlerProvider,
    ],
    exports: [
        getUserByIdQueryHandlerProvider,
        getUserInfoByIdQueryHandlerProvider,
        getWorkspacesByOwnerIdQueryHandlerProvider,
        addRoleToUserCommandHandlerProvider,
    ],
})
export class UserModule {
    static forRoot(): DynamicModule {
        return {
            module: UserModule,
        };
    }
}
