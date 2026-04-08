import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { WorkspaceMemberRepositoryScope } from "wm/workspace-member/application/workspace-member.repository-scope";
import { DrizzleWorkspaceMemberRepository } from "../drizzle-workspace-member.repository";
import { RoleRepository } from "iam/role/domain/role.repository";
import { UserRepository } from "iam/user/domain/user.repository";
import { WorkspaceRepository } from "wm/workspace/domain/workspace.repository";
import { DrizzleWorkspaceMemberQueryRepository } from "./drizzle-workspace-member-query.repository";
import { DrizzleWorkspaceRepository } from "wm/workspace/infrastructure/persistence/drizzle-workspace.repository";
import { DrizzleRoleRepository } from "iam/role/infrastructure/persistence/drizzle-role.repository";
import { DrizzleUserRepository } from "iam/user/infrastructure/persistence/drizzle-user.repository";

export class DrizzleWorkspaceMemberRepositoryScope implements WorkspaceMemberRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import("shared/infrastructure/persistence/drizzle/schema")
        >
    ) {}

    getUserRepository(): UserRepository {
        return new DrizzleUserRepository(this.db);
    }

    getRoleRepository(): RoleRepository {
        return new DrizzleRoleRepository(this.db);
    }

    getWorkspaceRepository(): WorkspaceRepository {
        return new DrizzleWorkspaceRepository(this.db);
    }

    getWorkspaceMemberRepository() {
        return new DrizzleWorkspaceMemberRepository(this.db);
    }

    getWorkspaceMemberQueryRepository() {
        return new DrizzleWorkspaceMemberQueryRepository(this.db);
    }
}