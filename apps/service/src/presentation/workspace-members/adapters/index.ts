import { DRIZZLE_INSTANCE } from "presentation/shared/adapters/constants";
import { ADD_MEMBER_TO_WORKSPACE_COMMAND_HANDLER, WORKSPACE_MEMBER_QUERY_REPOSITORY, WORKSPACE_MEMBER_REPOSITORY, WORKSPACE_MEMBER_UNIT_OF_WORK } from "./constants";
import { Provider, Scope } from "@nestjs/common";
import { DrizzleWorkspaceMemberUnitOfWork } from "wm/workspace-member/infrastructure/persistence/drizzle/drizzle-workspace-member.uow";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleWorkspaceMemberRepository } from "wm/workspace-member/infrastructure/persistence/drizzle-workspace-member.repository";
import { AddMemberToWorkspaceCommandHandler } from "wm/workspace-member/application/command/add-member-to-workspace/handler";

export const workspaceMemberUnitOfWorkProvider: Provider = {
    provide: WORKSPACE_MEMBER_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleWorkspaceMemberUnitOfWork(database),
    scope: Scope.REQUEST,
};  

export const workspaceMemberRepositoryProvider: Provider = {
    provide: WORKSPACE_MEMBER_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleWorkspaceMemberRepository(database),
    scope: Scope.DEFAULT,
};

export const workspaceMemberQueryRepositoryProvider: Provider = {
    provide: WORKSPACE_MEMBER_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleWorkspaceMemberRepository(database),
    scope: Scope.DEFAULT,
};

export const addMemberToWorkspaceCommandHandlerProvider: Provider = {
    provide: ADD_MEMBER_TO_WORKSPACE_COMMAND_HANDLER,
    inject: [WORKSPACE_MEMBER_UNIT_OF_WORK],
    useFactory: (workspaceMemberUnitOfWork: DrizzleWorkspaceMemberUnitOfWork) =>
        new AddMemberToWorkspaceCommandHandler(workspaceMemberUnitOfWork),
    scope: Scope.REQUEST,
};
