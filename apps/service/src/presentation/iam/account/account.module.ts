import { Module } from '@nestjs/common';

import { AccountController } from './account.controller';
import { AccountAdapterModule } from './adapters/account-adapter.module';

@Module({
    controllers: [AccountController],
    imports: [AccountAdapterModule],
    exports: [AccountAdapterModule],
})
export class AccountModule { }
