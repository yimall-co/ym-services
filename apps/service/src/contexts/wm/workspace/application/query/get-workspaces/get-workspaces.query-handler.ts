import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { GetWorkspacesQuery } from 'wm/workspace/application/query/get-workspaces/get-workspaces.query';

import { WorkspaceDto } from './get-workspaces.dto';
import { WorkspaceQueryRepository } from '../workspace-query.repository';

export class GetWorkspacesQueryHandler implements QueryHandler<GetWorkspacesQuery, WorkspaceDto[]> {
    constructor(private readonly workspaceQueryRepository: WorkspaceQueryRepository) { }

    subscribedTo(): Query {
        return GetWorkspacesQuery;
    }

    async handle(): Promise<WorkspaceDto[]> {
        const workspaces = await this.workspaceQueryRepository.findAll();
        return workspaces;
    }
}
