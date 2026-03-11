import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UserRepository } from 'iam/user/domain/user.repository';
import { AccountRepository } from 'iam/account/domain/account.repository';
import { UserQueryRepository } from 'iam/user/application/query/user-query.repository';
import { CreateUserCommandHandler } from 'iam/user/application/command/create/create-user.command-handler';
import { GetUserByEmailQueryHandler } from 'iam/user/application/query/get-user-by-email/get-user-by-email.query-handler';
import { DrizzleUserRepository } from 'iam/user/infrastructure/persistence/drizzle-user.repository';
import { DrizzleUserQueryRepository } from 'iam/user/infrastructure/drizzle-user-query.repository';
import { CreateAccountCommandHandler } from 'iam/account/application/command/create/create-account.command-handler';
import { DrizzleAccountRepository } from 'iam/account/infrastructure/persistence/drizzle-account.repository';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    ACCOUNT_REPOSITORY,
    CREATE_ACCOUNT_COMMAND_HANDLER,
    CREATE_USER_COMMAND_HANDLER,
    GET_USER_BY_EMAIl_QUERY_HANDLER,
    USER_QUERY_REPOSITORY,
    USER_REPOSITORY,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const userRepositoryProvider: Provider = {
    provide: USER_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleUserRepository(database),
    scope: Scope.DEFAULT,
};

export const userQueryRepositoryProvider: Provider = {
    provide: USER_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleUserQueryRepository(database),
    scope: Scope.DEFAULT,
};

export const accountRepositoryProvider: Provider = {
    provide: ACCOUNT_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleAccountRepository(database),
    scope: Scope.DEFAULT,
};

export const getUserByEmailQueryHandlerProvider: Provider = {
    provide: GET_USER_BY_EMAIl_QUERY_HANDLER,
    inject: [USER_QUERY_REPOSITORY],
    useFactory: (userQueryRepository: UserQueryRepository) => new GetUserByEmailQueryHandler(userQueryRepository),
    scope: Scope.DEFAULT,
};

export const createUserCommandHandlerProvider: Provider = {
    provide: CREATE_USER_COMMAND_HANDLER,
    inject: [USER_REPOSITORY],
    useFactory: (userRepository: UserRepository) => new CreateUserCommandHandler(userRepository),
    scope: Scope.DEFAULT,
};

export const createAccountCommandHandlerProvider: Provider = {
    provide: CREATE_ACCOUNT_COMMAND_HANDLER,
    inject: [ACCOUNT_REPOSITORY],
    useFactory: (accountRepository: AccountRepository) => new CreateAccountCommandHandler(accountRepository),
    scope: Scope.DEFAULT,
};
