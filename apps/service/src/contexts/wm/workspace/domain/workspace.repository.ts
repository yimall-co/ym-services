import { WorkspaceId } from 'wm/shared/domain/workspace-id';

import { Workspace } from './workspace';
import { WorkspaceSlug } from './value-object/workspace-slug';

export interface WorkspaceRepository {
    existsActiveById(id: WorkspaceId): Promise<boolean>;
    existsActiveBySlug(slug: WorkspaceSlug): Promise<boolean>;
    findById(id: WorkspaceId): Promise<Workspace>;
    save(workspace: Workspace): Promise<void>;
    update(id: WorkspaceId, workspace: Workspace): Promise<void>;
}
