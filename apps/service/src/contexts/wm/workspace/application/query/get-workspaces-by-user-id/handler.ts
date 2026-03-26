import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { WorkspaceByUserDto } from './dto';
import { GetWorkspacesByUserIdQuery } from './query';
import { WorkspaceRepositoryScope } from '../../workspace.repository-scope';

export class GetWorkspacesByUserIdQueryHandler implements QueryHandler<
    GetWorkspacesByUserIdQuery,
    Array<WorkspaceByUserDto>
> {
    constructor(private readonly uow: UnitOfWork<WorkspaceRepositoryScope>) { }

    subscribedTo(): Query {
        return GetWorkspacesByUserIdQuery;
    }

    async handle(query: GetWorkspacesByUserIdQuery): Promise<WorkspaceByUserDto[]> {
        return this.uow.withTransaction(async (scope) => {
            const workspaceQueryRepository = scope.getWorkspaceQueryRepository();

            return await workspaceQueryRepository.findWorkspacesByUserId(query.userId);
        });
    }
}
