import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [AuthModule, PermissionModule, ProfileModule, RoleModule, UserModule],
    exports: [AuthModule, PermissionModule, ProfileModule, RoleModule, UserModule],
})
export class IdentityAccessManagementModule { }
