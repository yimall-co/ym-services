import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleAccountRepository } from 'core/iam/account/infrastructure/persistence/drizzle-account.repository';

import { DRIZZLE_INSTANCE } from 'src/common/adapters/constants';

import { ACCOUNT_REPOSITORY } from './constants';

@Module({
    imports: [],
    providers: [
        {
            provide: ACCOUNT_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (database: NodePgDatabase<Schema>) =>
                new DrizzleAccountRepository(database),
            scope: Scope.REQUEST,
        },
    ],
    exports: [ACCOUNT_REPOSITORY],
})
export class AccountAdapterModule { }
