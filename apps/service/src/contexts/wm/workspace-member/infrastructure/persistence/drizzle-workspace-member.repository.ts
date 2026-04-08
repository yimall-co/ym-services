import { UserId } from "iam/shared/domain/user-id";
import { DrizzleRepository } from "shared/infrastructure/persistence/drizzle/drizzle.repository";
import { WorkspaceId } from "wm/shared/domain/workspace-id";
import { WorkspaceMemberId } from "wm/shared/domain/workspace-member-id";
import { WorkspaceMember } from "wm/workspace-member/domain/workspace-member";
import { WorkspaceMemberRepository } from "wm/workspace-member/domain/workspace-member.repository";
import { workspaceMembers } from "./drizzle/workspace-member.table";
import { WorkspaceMemberMapper } from "../mapper/workspace-member.mapper";
import { and, eq } from "drizzle-orm";

export class DrizzleWorkspaceMemberRepository extends DrizzleRepository<typeof workspaceMembers> implements WorkspaceMemberRepository {

    protected readonly table = workspaceMembers;


    async save(member: WorkspaceMember): Promise<void> {
        return this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            tx
                .insert(this.table)
                .values({...WorkspaceMemberMapper.toPersistence(member)});
        });

    }

    async findById(id: WorkspaceMemberId): Promise<WorkspaceMember> {
        return this.client            
            .select()
            .from(this.table)
            .where(eq(this.table.id, id.value))
            .limit(1)
            .then(([row]) => {
                if (!row) {
                    throw new Error('WorkspaceMember not found');
                }
                return WorkspaceMemberMapper.toDomain(row);
            });
    }

    async existsByWorkspaceAndUser(workspaceId: WorkspaceId, userId: UserId): Promise<boolean> {
        return this.client
            .select({ id: this.table.id })
            .from(this.table)
            .where(
                and(
                    eq(this.table.workspaceId, workspaceId.value),
                    eq(this.table.userId, userId.value)
                )
            )
            .limit(1)
            .then(rows => rows.length > 0);
    }
    
}