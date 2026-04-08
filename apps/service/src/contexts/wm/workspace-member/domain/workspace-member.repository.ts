import { WorkspaceMember } from './workspace-member';
import { WorkspaceMemberId } from 'wm/shared/domain/workspace-member-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { UserId } from 'iam/shared/domain/user-id';

export interface WorkspaceMemberRepository {
    save(member: WorkspaceMember): Promise<void>;
    findById(id: WorkspaceMemberId): Promise<WorkspaceMember>;
    existsByWorkspaceAndUser(workspaceId: WorkspaceId, userId: UserId): Promise<boolean>;
}
