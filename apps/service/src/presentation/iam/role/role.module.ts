import { Module } from '@nestjs/common';

import { RoleController } from './role.controller';
import { RoleAdapterModule } from './adapters/role-adapter.module';

@Module({
    controllers: [RoleController],
    imports: [RoleAdapterModule],
    exports: [RoleAdapterModule],
})
export class RoleModule { }
