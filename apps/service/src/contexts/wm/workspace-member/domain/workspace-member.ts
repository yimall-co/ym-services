import { AggregateRoot } from 'shared/domain/aggregate-root';

import { WorkspaceMemberId } from 'wm/shared/domain/workspace-member-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { UserId } from 'iam/shared/domain/user-id';
import { RoleId } from 'iam/shared/domain/role-id';

import { WorkspaceMemberJoinedAt } from './value-object/workspace-member-joined-at';
import { WorkspaceMemberUpdatedAt } from './value-object/workspace-member-updated-at';
import { WorkspaceMemberIsActive } from './value-object/workspace-member-is-active';

export interface WorkspaceMemberPrimitives {
    id: string;
    workspaceId: string;
    userId: string;
    roleId: string;
    joinedAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export class WorkspaceMember extends AggregateRoot<WorkspaceMemberPrimitives> {
    private readonly id: WorkspaceMemberId;
    private readonly workspaceId: WorkspaceId;
    private readonly userId: UserId;
    private roleId: RoleId;
    private readonly joinedAt: WorkspaceMemberJoinedAt;
    private updatedAt: WorkspaceMemberUpdatedAt;
    private isActive: WorkspaceMemberIsActive;

    constructor(
        id: WorkspaceMemberId,
        workspaceId: WorkspaceId,
        userId: UserId,
        roleId: RoleId,
        joinedAt: WorkspaceMemberJoinedAt,
        updatedAt: WorkspaceMemberUpdatedAt,
        isActive: WorkspaceMemberIsActive,
    ) {
        super();

        this.id = id;
        this.workspaceId = workspaceId;
        this.userId = userId;
        this.roleId = roleId;
        this.joinedAt = joinedAt;
        this.updatedAt = updatedAt;
        this.isActive = isActive;
    }

    static create(
        workspaceId: WorkspaceId,
        userId: UserId,
        roleId: RoleId,
    ): WorkspaceMember {
        return new WorkspaceMember(
            WorkspaceMemberId.random(),
            workspaceId,
            userId,
            roleId,
            new WorkspaceMemberJoinedAt(new Date()),
            new WorkspaceMemberUpdatedAt(new Date()),
            new WorkspaceMemberIsActive(true),
        );
    }

    static fromPrimitives(primitives: WorkspaceMemberPrimitives): WorkspaceMember {
        return new WorkspaceMember(
            new WorkspaceMemberId(primitives.id),
            new WorkspaceId(primitives.workspaceId),
            new UserId(primitives.userId),
            new RoleId(primitives.roleId),
            new WorkspaceMemberJoinedAt(primitives.joinedAt),
            new WorkspaceMemberUpdatedAt(primitives.updatedAt),
            new WorkspaceMemberIsActive(primitives.isActive),
        );
    }

    getId(): WorkspaceMemberId {
        return this.id;
    }

    getWorkspaceId(): WorkspaceId {
        return this.workspaceId;
    }

    getUserId(): UserId {
        return this.userId;
    }

    getRoleId(): RoleId {
        return this.roleId;
    }

    changeRole(newRoleId: RoleId): void {
        if (this.roleId.equals(newRoleId)) return;

        this.roleId = newRoleId;

        this.touch();
    }

    deactivate(): void {
        if (!this.isActive.value) return;

        this.isActive = new WorkspaceMemberIsActive(false);

        this.touch();
    }

    activate(): void {
        if (this.isActive.value) return;

        this.isActive = new WorkspaceMemberIsActive(true);

        this.touch();
    }

    toPrimitives(): WorkspaceMemberPrimitives {
        return {
            id: this.id.value,
            workspaceId: this.workspaceId.value,
            userId: this.userId.value,
            roleId: this.roleId.value,
            joinedAt: this.joinedAt.value,
            updatedAt: this.updatedAt.value,
            isActive: this.isActive.value,
        };
    }

    private touch(): void {
        this.updatedAt = new WorkspaceMemberUpdatedAt(new Date());
    }
}
