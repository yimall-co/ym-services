import { WorkspaceId } from 'wm/shared/domain/workspace-id';

import { Workspace } from './workspace';

export interface WorkspaceRepository {
    findById(id: WorkspaceId): Promise<Workspace>;
    save(workspace: Workspace): Promise<void>;
    update(id: WorkspaceId, workspace: Workspace): Promise<void>;
}
