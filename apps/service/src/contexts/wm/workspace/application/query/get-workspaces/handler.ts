import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { WorkspaceDto } from './dto';
import { GetWorkspacesQuery } from './query';
import { PaginatedWorkspace, WorkspaceQueryRepository } from '../workspace-query.repository';

export class GetWorkspacesQueryHandler implements QueryHandler<
    GetWorkspacesQuery,
    PaginatedWorkspace<WorkspaceDto>
> {
    constructor(private readonly workspaceQueryRepository: WorkspaceQueryRepository) { }

    subscribedTo(): Query {
        return GetWorkspacesQuery;
    }

    async handle(query: GetWorkspacesQuery): Promise<PaginatedWorkspace<WorkspaceDto>> {
        const paginatedWorkspaces = await this.workspaceQueryRepository.findAll({
            limit: query.limit,
            cursor: { id: query.id, updatedAt: query.updatedAt },
        });

        return paginatedWorkspaces;
    }
}
