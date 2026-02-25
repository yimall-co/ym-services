import { QueryHandler } from 'shared/domain/query-handler';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { GetWorkspacesQuery } from 'wm/workspace/domain/get-workspaces.query';

import { WorkspacesResult } from '../workspaces-result';

export class GetWorkspacesQueryHandler implements QueryHandler<
    GetWorkspacesQuery,
    WorkspacesResult
> {
    constructor(private readonly workspaceRepository: WorkspaceRepository) { }

    subscribedTo(): GetWorkspacesQuery {
        return GetWorkspacesQuery;
    }

    async handle(): Promise<WorkspacesResult> {
        const workspaces = await this.workspaceRepository.findAll();
        return new WorkspacesResult(workspaces);
    }
}
