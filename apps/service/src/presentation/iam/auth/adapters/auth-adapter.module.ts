import { Module } from '@nestjs/common';

import { AccountAdapterModule } from 'presentation/iam/account/adapters/account-adapter.module';
import { UserAdapterModule } from 'presentation/iam/user/adapters/user-adapter.module';

@Module({
    imports: [AccountAdapterModule, UserAdapterModule],
    providers: [],
    exports: [],
})
export class AuthAdapterModule { }
