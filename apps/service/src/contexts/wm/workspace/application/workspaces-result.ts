import { Workspace } from '../domain/workspace';
import { WorkspaceResult } from './query/workspace-result';

export class WorkspacesResult {
    readonly workspaces: Array<WorkspaceResult>;

    constructor(workspaces: Array<Workspace>) {
        this.workspaces = workspaces.map((w) => new WorkspaceResult(w));
    }
}
