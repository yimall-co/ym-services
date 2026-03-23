import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';
import { UserRepositoryScope } from 'iam/user/application/user.repository-scope';
import { AddRoleToUserCommandHandler } from 'iam/user/application/command/add-role-to-user/handler';
import { DrizzleUserUnitOfWork } from 'iam/user/infrastructure/persistence/drizzle-user.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import { ADD_ROLE_TO_USER_COMMAND_HANDLER, USER_UNIT_OF_WORK } from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const userUnitOfWorkProvider: Provider = {
    provide: USER_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleUserUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const addRoleToUserCommandHandlerProvider: Provider = {
    provide: ADD_ROLE_TO_USER_COMMAND_HANDLER,
    inject: [USER_UNIT_OF_WORK],
    useFactory: (unitOfWork: UnitOfWork<UserRepositoryScope>) =>
        new AddRoleToUserCommandHandler(unitOfWork),
    scope: Scope.REQUEST,
};
