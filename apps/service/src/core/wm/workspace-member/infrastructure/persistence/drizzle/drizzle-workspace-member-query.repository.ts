import { DrizzleRepository } from "shared/infrastructure/persistence/drizzle/drizzle.repository";
import { WorkspaceMemberQueryRepository } from "wm/workspace-member/application/query/workspace-member-query.repository";
import { workspaceMembers } from "./workspace-member.table";

export class DrizzleWorkspaceMemberQueryRepository extends DrizzleRepository<typeof workspaceMembers> implements WorkspaceMemberQueryRepository {
    protected readonly table = workspaceMembers;
}