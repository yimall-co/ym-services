import { WorkspaceDto } from './get-workspaces/dto';
import { WorkspaceByIdDto } from './get-workspace-by-id/dto';

export interface WorkspaceQueryRepository {
    findAll(): Promise<Array<WorkspaceDto>>;
    findById(id: string): Promise<WorkspaceByIdDto | null>;
    findOne(id: string): Promise<WorkspaceByIdDto | null>;
}
