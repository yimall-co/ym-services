import { WorkspaceDto } from './get-workspaces/dto';
import { WorkspaceByIdDto } from './get-workspace-by-id/dto';
import { WorkspaceByUserDto } from './get-workspaces-by-user-id/dto';

export interface PaginatedWorkspace<T> {
    results: Array<T>;
    hasNextPage: boolean;
    lastItem: T | null;
}

export interface WorkspaceQueryRepository {
    findAll(criteria: {
        limit?: number;
        cursor?: { id?: string; updatedAt?: Date };
    }): Promise<PaginatedWorkspace<WorkspaceDto>>;
    findById(id: string): Promise<WorkspaceByIdDto | null>;
    findOne(id: string): Promise<WorkspaceByIdDto | null>;
    findWorkspacesByUserId(userId: string): Promise<Array<WorkspaceByUserDto>>;
}
