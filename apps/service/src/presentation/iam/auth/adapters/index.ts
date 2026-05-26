import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { UserRepositoryScope } from 'core/iam/user/application/user.repository-scope';
import { CreateUserCommandHandler } from 'core/iam/user/application/command/create-user/handler';
import { GetUserByEmailQueryHandler } from 'core/iam/user/application/query/get-user-by-email/handler';
import { DrizzleUserUnitOfWork } from 'core/iam/user/infrastructure/persistence/drizzle-user.uow';
import { DrizzleAccountRepository } from 'core/iam/account/infrastructure/persistence/drizzle-account.repository';

import { DRIZZLE_INSTANCE } from 'src/common/adapters/constants';

import {
    ACCOUNT_REPOSITORY,
    CREATE_USER_COMMAND_HANDLER,
    GET_USER_BY_EMAIl_QUERY_HANDLER,
    USER_UNIT_OF_WORK,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const userUnitOfWorkProvider: Provider = {
    provide: USER_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleUserUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const createUserCommandHandlerProvider: Provider = {
    provide: CREATE_USER_COMMAND_HANDLER,
    inject: [USER_UNIT_OF_WORK],
    useFactory: (userUnitOfWork: UnitOfWork<UserRepositoryScope>) =>
        new CreateUserCommandHandler(userUnitOfWork),
    scope: Scope.REQUEST,
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
