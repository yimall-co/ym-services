import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';
import { PermissionRepositoryScope } from 'iam/permission/application/permission.repository-scope';
import { CreatePermissionCommandHandler } from 'iam/permission/application/command/create-permission/handler';
import { DrizzlePermissionUnitOfWork } from 'iam/permission/infrastructure/persistence/drizzle-permission.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import { CREATE_PERMISSION_COMMAND_HANDLER, PERMISSION_UNIT_OF_WORK } from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const permissionUnitOfWorkProvider: Provider = {
    provide: PERMISSION_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzlePermissionUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const createPermissionCommandHandlerProvider: Provider = {
    provide: CREATE_PERMISSION_COMMAND_HANDLER,
    inject: [PERMISSION_UNIT_OF_WORK],
    useFactory: (permissionUnitOfWork: UnitOfWork<PermissionRepositoryScope>) =>
        new CreatePermissionCommandHandler(permissionUnitOfWork),
    scope: Scope.REQUEST,
};
