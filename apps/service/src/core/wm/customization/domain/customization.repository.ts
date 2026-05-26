import { WorkspaceId } from 'wm/shared/domain/workspace-id';

import { Customization } from './customization';

export interface CustomizationRepository {
    existsByWorkspaceId(workspaceId: WorkspaceId): Promise<boolean>;
    save(customization: Customization): Promise<void>;
}
