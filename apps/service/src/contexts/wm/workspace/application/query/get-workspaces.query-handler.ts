import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { GetWorkspacesQuery } from 'wm/workspace/application/query/get-workspaces.query';

import { WorkspacesResult } from '../workspaces-result';

export class GetWorkspacesQueryHandler implements QueryHandler<
    GetWorkspacesQuery,
    WorkspacesResult
> {
    constructor(private readonly workspaceRepository: WorkspaceRepository) { }

    subscribedTo(): Query {
        return GetWorkspacesQuery;
    }

    async handle(): Promise<WorkspacesResult> {
        const workspaces = await this.workspaceRepository.findAll();
        return new WorkspacesResult(workspaces);
    }
}
