import { WorkspaceId } from "wm/shared/domain/workspace-id";

import { Workspace } from "./workspace";

export interface WorkspaceRepository {
    findAll(): Promise<Array<Workspace>>;
    findById(id: WorkspaceId): Promise<Workspace>;
    save(workspace: Workspace): Promise<void>;
    update(workspace: Workspace): Promise<void>;
}