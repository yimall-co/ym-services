import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';
import { UserRepositoryScope } from 'iam/user/application/user.repository-scope';
import { GetUserByIdQueryHandler } from 'iam/user/application/query/get-user-by-id/handler';
import { GetUserInfoByIdQueryHandler } from 'iam/user/application/query/get-user-info-by-id/handler';
import { AddRoleToUserCommandHandler } from 'iam/user/application/command/add-role-to-user/handler';
import { GetWorkspacesByUserIdQueryHandler } from 'wm/workspace/application/query/get-workspaces-by-user-id/handler';
import { WorkspaceRepositoryScope } from 'wm/workspace/application/workspace.repository-scope';
import { UserUnitOfWork } from 'iam/user/infrastructure/persistence/user.uow';
import { DrizzleWorkspaceUnitOfWork } from 'wm/workspace/infrastructure/persistence/drizzle-workspace.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    ADD_ROLE_TO_USER_COMMAND_HANDLER,
    GET_USER_BY_ID_QUERY_HANDLER,
    GET_USER_INFO_BY_ID_QUERY_HANDLER,
    GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
    USER_UNIT_OF_WORK,
    WORKSPACE_UNIT_OF_WORK,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const userUnitOfWorkProvider: Provider = {
    provide: USER_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new UserUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const workspaceUnitOfWorkProvider: Provider = {
    provide: WORKSPACE_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleWorkspaceUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const getUserByIdQueryHandlerProvider: Provider = {
    provide: GET_USER_BY_ID_QUERY_HANDLER,
    inject: [USER_UNIT_OF_WORK],
    useFactory: (unitOfWork: UnitOfWork<UserRepositoryScope>) =>
        new GetUserByIdQueryHandler(unitOfWork),
    scope: Scope.REQUEST,
};

export const getUserInfoByIdQueryHandlerProvider: Provider = {
    provide: GET_USER_INFO_BY_ID_QUERY_HANDLER,
    inject: [USER_UNIT_OF_WORK],
    useFactory: (unitOfWork: UnitOfWork<UserRepositoryScope>) =>
        new GetUserInfoByIdQueryHandler(unitOfWork),
    scope: Scope.REQUEST,
};

export const getWorkspacesByOwnerIdQueryHandlerProvider: Provider = {
    provide: GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
    inject: [WORKSPACE_UNIT_OF_WORK],
    useFactory: (unitOfWork: UnitOfWork<WorkspaceRepositoryScope>) =>
        new GetWorkspacesByUserIdQueryHandler(unitOfWork),
    scope: Scope.REQUEST,
};

export const addRoleToUserCommandHandlerProvider: Provider = {
    provide: ADD_ROLE_TO_USER_COMMAND_HANDLER,
    inject: [USER_UNIT_OF_WORK],
    useFactory: (unitOfWork: UnitOfWork<UserRepositoryScope>) =>
        new AddRoleToUserCommandHandler(unitOfWork),
    scope: Scope.REQUEST,
};
