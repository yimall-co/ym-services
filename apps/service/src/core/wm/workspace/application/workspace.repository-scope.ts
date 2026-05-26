import { WorkspaceRepository } from '../domain/workspace.repository';
import { WorkspaceQueryRepository } from './query/workspace-query.repository';

export interface WorkspaceRepositoryScope {
    getWorkspaceRepository(): WorkspaceRepository;
    getWorkspaceQueryRepository(): WorkspaceQueryRepository;
}
