import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { AddRoleToUserCommandHandler } from 'core/iam/user/application/command/add-role-to-user/handler';
import { DrizzleUserUnitOfWork } from 'core/iam/user/infrastructure/persistence/drizzle-user.uow';
import { DrizzleUserRepository } from 'core/iam/user/infrastructure/persistence/drizzle-user.repository';
import { DrizzleUserQueryRepository } from 'core/iam/user/infrastructure/persistence/drizzle-user-query.repository';
import { GetUserByIdQueryHandler } from 'core/iam/user/application/query/get-user-by-id/handler';
import { GetUserInfoByIdQueryHandler } from 'core/iam/user/application/query/get-user-info-by-id/handler';
import { GetWorkspacesByUserIdQueryHandler } from 'wm/workspace/application/query/get-workspaces-by-user-id/handler';
import { WorkspaceQueryRepository } from 'wm/workspace/application/query/workspace-query.repository';

import { DRIZZLE_INSTANCE } from 'src/common/adapters/constants';
import { WORKSPACE_QUERY_REPOSITORY } from 'presentation/wm/workspace/adapters/constants';
import { WorkspaceAdapterModule } from 'presentation/wm/workspace/adapters/workspace-adapter.module';

import {
    ADD_ROLE_TO_USER_COMMAND_HANDLER,
    GET_USER_BY_ID_QUERY_HANDLER,
    GET_USER_INFO_BY_ID_QUERY_HANDLER,
    GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
    USER_QUERY_REPOSITORY,
    USER_REPOSITORY,
    USER_UNIT_OF_WORK,
} from './constants';

@Module({
    imports: [WorkspaceAdapterModule],
    providers: [
        {
            provide: USER_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleUserRepository(db),
            scope: Scope.REQUEST,
        },
        {
            provide: USER_QUERY_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleUserQueryRepository(db),
            scope: Scope.REQUEST,
        },
        {
            provide: USER_UNIT_OF_WORK,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleUserUnitOfWork(db),
            scope: Scope.REQUEST,
        },
        {
            provide: GET_USER_BY_ID_QUERY_HANDLER,
            inject: [USER_QUERY_REPOSITORY],
            useFactory: (userQueryRepository: DrizzleUserQueryRepository) =>
                new GetUserByIdQueryHandler(userQueryRepository),
            scope: Scope.REQUEST,
        },
        {
            provide: GET_USER_INFO_BY_ID_QUERY_HANDLER,
            inject: [USER_QUERY_REPOSITORY],
            useFactory: (userQueryRepository: DrizzleUserQueryRepository) =>
                new GetUserInfoByIdQueryHandler(userQueryRepository),
            scope: Scope.REQUEST,
        },
        {
            provide: GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
            inject: [WORKSPACE_QUERY_REPOSITORY],
            useFactory: (workspaceQueryRepository: WorkspaceQueryRepository) =>
                new GetWorkspacesByUserIdQueryHandler(workspaceQueryRepository),
            scope: Scope.REQUEST,
        },
        {
            provide: ADD_ROLE_TO_USER_COMMAND_HANDLER,
            inject: [USER_UNIT_OF_WORK],
            useFactory: (userUnitOfWork: DrizzleUserUnitOfWork) =>
                new AddRoleToUserCommandHandler(userUnitOfWork),
            scope: Scope.REQUEST,
        },
    ],
    exports: [
        USER_REPOSITORY,
        USER_QUERY_REPOSITORY,
        USER_UNIT_OF_WORK,
        GET_USER_BY_ID_QUERY_HANDLER,
        GET_USER_INFO_BY_ID_QUERY_HANDLER,
        GET_WORKSPACES_BY_OWNER_ID_QUERY_HANDLER,
        ADD_ROLE_TO_USER_COMMAND_HANDLER,
    ],
})
export class UserAdapterModule { }
