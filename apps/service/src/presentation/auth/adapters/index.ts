import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { AccountRepository } from 'iam/account/domain/account.repository';
import { UserRepositoryScope } from 'iam/user/application/user.repository-scope';
import { CreateUserCommandHandler } from 'iam/user/application/command/create-user/handler';
import { GetUserByEmailQueryHandler } from 'iam/user/application/query/get-user-by-email/handler';
import { UserUnitOfWork } from 'iam/user/infrastructure/persistence/user.uow';
import { CreateAccountCommandHandler } from 'iam/account/application/command/create/create-account.command-handler';
import { DrizzleAccountRepository } from 'iam/account/infrastructure/persistence/drizzle-account.repository';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    ACCOUNT_REPOSITORY,
    CREATE_ACCOUNT_COMMAND_HANDLER,
    CREATE_USER_COMMAND_HANDLER,
    GET_USER_BY_EMAIl_QUERY_HANDLER,
    USER_UNIT_OF_WORK,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const userUnitOfWorkProvider: Provider = {
    provide: USER_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new UserUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const createUserCommandHandlerProvider: Provider = {
    provide: CREATE_USER_COMMAND_HANDLER,
    inject: [USER_UNIT_OF_WORK],
    useFactory: (userUnitOfWork: UnitOfWork<UserRepositoryScope>) =>
        new CreateUserCommandHandler(userUnitOfWork),
    scope: Scope.REQUEST,
};

export const createAccountCommandHandlerProvider: Provider = {
    provide: CREATE_ACCOUNT_COMMAND_HANDLER,
    inject: [ACCOUNT_REPOSITORY],
    useFactory: (accountRepository: AccountRepository) =>
        new CreateAccountCommandHandler(accountRepository),
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
    inject: [USER_UNIT_OF_WORK],
    useFactory: (userUnitOfWork: UnitOfWork<UserRepositoryScope>) =>
        new GetUserByEmailQueryHandler(userUnitOfWork),
    scope: Scope.REQUEST,
};
