import { DynamicModule, Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { addRoleToUserCommandHandlerProvider, userUnitOfWorkProvider } from './adapters';

@Module({
    controllers: [UserController],
    providers: [UserService, userUnitOfWorkProvider, addRoleToUserCommandHandlerProvider],
    exports: [addRoleToUserCommandHandlerProvider],
})
export class UserModule {
    static forRoot(): DynamicModule {
        return {
            module: UserModule,
        };
    }
}
