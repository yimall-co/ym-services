import { WorkspaceByIdDto } from './get-workspace-by-id.dto';

export interface WorkspaceQueryRepository {
    findById(id: string): Promise<WorkspaceByIdDto | null>;
}
