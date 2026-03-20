import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';
import { RoleRepositoryScope } from 'iam/role/application/role.repository-scope';
import { CreateRoleCommandHandler } from 'iam/role/application/command/create-role/handler';
import { UpdateRoleCommandHandler } from 'iam/role/application/command/update-role/handler';
import { AddPermissionToRoleCommandHandler } from 'iam/role/application/command/add-permission-to-role/handler';
import { DrizzleRoleUnitOfWork } from 'iam/role/infrastructure/persistence/drizzle-role.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
    CREATE_ROLE_COMMAND_HANDLER,
    ROLE_UNIT_OF_WORK,
    UPDATE_ROLE_COMMAND_HANDLER,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const roleUnitOfWorkProvider: Provider = {
    provide: ROLE_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleRoleUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const createRoleCommandHandlerProvider: Provider = {
    provide: CREATE_ROLE_COMMAND_HANDLER,
    inject: [ROLE_UNIT_OF_WORK],
    useFactory: (uwo: UnitOfWork<RoleRepositoryScope>) => new CreateRoleCommandHandler(uwo),
    scope: Scope.REQUEST,
};

export const updateRoleCommandHandlerProvider: Provider = {
    provide: UPDATE_ROLE_COMMAND_HANDLER,
    inject: [ROLE_UNIT_OF_WORK],
    useFactory: (uwo: UnitOfWork<RoleRepositoryScope>) => new UpdateRoleCommandHandler(uwo),
    scope: Scope.REQUEST,
};

export const addPermissionToRoleCommandHandlerProvider: Provider = {
    provide: ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
    inject: [ROLE_UNIT_OF_WORK],
    useFactory: (uwo: UnitOfWork<RoleRepositoryScope>) =>
        new AddPermissionToRoleCommandHandler(uwo),
    scope: Scope.REQUEST,
};
