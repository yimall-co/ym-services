import { WorkspaceDto } from './get-workspaces/get-workspaces.dto';
import { WorkspaceByIdDto } from './get-workspace-by-id/get-workspace-by-id.dto';

export interface WorkspaceQueryRepository {
    findAll(): Promise<WorkspaceDto[]>;
    findById(id: string): Promise<WorkspaceByIdDto | null>;
    findOne(id: string): Promise<WorkspaceByIdDto | null>;
}
