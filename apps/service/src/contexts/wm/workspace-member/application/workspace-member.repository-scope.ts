import { RoleRepository } from "iam/role/domain/role.repository";
import { UserRepository } from "iam/user/domain/user.repository";
import { WorkspaceRepository } from "wm/workspace/domain/workspace.repository";
import { WorkspaceMemberRepository } from "../domain/workspace-member.repository";
import { WorkspaceMemberQueryRepository } from "./query/workspace-member-query.repository";

export interface WorkspaceMemberRepositoryScope {
    getWorkspaceMemberRepository(): WorkspaceMemberRepository;
    getWorkspaceMemberQueryRepository(): WorkspaceMemberQueryRepository;
    getUserRepository(): UserRepository;
    getRoleRepository(): RoleRepository;
    getWorkspaceRepository(): WorkspaceRepository;
}