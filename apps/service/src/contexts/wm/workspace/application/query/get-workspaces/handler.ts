import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { WorkspaceDto } from './dto';
import { GetWorkspacesQuery } from './query';
import { PaginatedWorkspace } from '../workspace-query.repository';
import { WorkspaceRepositoryScope } from '../../workspace.repository-scope';

export class GetWorkspacesQueryHandler implements QueryHandler<
    GetWorkspacesQuery,
    PaginatedWorkspace<WorkspaceDto>
> {
    constructor(private readonly uow: UnitOfWork<WorkspaceRepositoryScope>) { }

    subscribedTo(): Query {
        return GetWorkspacesQuery;
    }

    async handle(query: GetWorkspacesQuery): Promise<PaginatedWorkspace<WorkspaceDto>> {
        return this.uow.withTransaction(async (scope) => {
            const workspaceQueryRepository = scope.getWorkspaceQueryRepository();

            const paginatedWorkspaces = await workspaceQueryRepository.findAll({
                limit: query.limit,
                cursor: { id: query.id, updatedAt: query.updatedAt },
            });

            return paginatedWorkspaces;
        });
    }
}
