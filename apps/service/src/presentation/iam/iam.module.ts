import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    imports: [AuthModule, PermissionModule, ProfileModule, RoleModule, UserModule],
    exports: [AuthModule, PermissionModule, ProfileModule, RoleModule, UserModule],
})
export class IdentityAccessManagementModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}
