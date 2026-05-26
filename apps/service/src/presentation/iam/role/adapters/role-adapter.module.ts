import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DrizzleRoleRepository } from 'core/iam/role/infrastructure/persistence/drizzle-role.repository';
import { DrizzleRoleUnitOfWork } from 'core/iam/role/infrastructure/persistence/drizzle-role.uow';
import { CreateRoleCommandHandler } from 'core/iam/role/application/command/create-role/handler';
import { UpdateRoleCommandHandler } from 'core/iam/role/application/command/update-role/handler';
import { AddPermissionToRoleCommandHandler } from 'core/iam/role/application/command/add-permission-to-role/handler';

import { DRIZZLE_INSTANCE } from 'src/common/adapters/constants';

import {
    ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
    CREATE_ROLE_COMMAND_HANDLER,
    ROLE_REPOSITORY,
    ROLE_UNIT_OF_WORK,
    UPDATE_ROLE_COMMAND_HANDLER,
} from './constants';

@Module({
    imports: [],
    providers: [
        {
            provide: ROLE_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleRoleRepository(db),
            scope: Scope.REQUEST,
        },
        {
            provide: ROLE_UNIT_OF_WORK,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleRoleUnitOfWork(db),
            scope: Scope.REQUEST,
        },
        {
            provide: CREATE_ROLE_COMMAND_HANDLER,
            inject: [ROLE_UNIT_OF_WORK],
            useFactory: (roleUnitOfWork: DrizzleRoleUnitOfWork) =>
                new CreateRoleCommandHandler(roleUnitOfWork),
            scope: Scope.REQUEST,
        },
        {
            provide: UPDATE_ROLE_COMMAND_HANDLER,
            inject: [ROLE_UNIT_OF_WORK],
            useFactory: (roleUnitOfWork: DrizzleRoleUnitOfWork) =>
                new UpdateRoleCommandHandler(roleUnitOfWork),
            scope: Scope.REQUEST,
        },
        {
            provide: ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
            inject: [ROLE_UNIT_OF_WORK],
            useFactory: (roleUnitOfWork: DrizzleRoleUnitOfWork) =>
                new AddPermissionToRoleCommandHandler(roleUnitOfWork),
            scope: Scope.REQUEST,
        },
    ],
    exports: [
        ROLE_REPOSITORY,
        ROLE_UNIT_OF_WORK,
        CREATE_ROLE_COMMAND_HANDLER,
        UPDATE_ROLE_COMMAND_HANDLER,
        ADD_PERMISSION_TO_ROLE_COMMAND_HANDLER,
    ],
})
export class RoleAdapterModule { }
