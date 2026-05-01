import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { WorkspaceByUserDto } from './dto';
import { GetWorkspacesByUserIdQuery } from './query';
import { WorkspaceQueryRepository } from '../workspace-query.repository';

export class GetWorkspacesByUserIdQueryHandler implements QueryHandler<
    GetWorkspacesByUserIdQuery,
    Array<WorkspaceByUserDto>
> {
    constructor(private readonly workspaceQueryRepository: WorkspaceQueryRepository) { }

    subscribedTo(): Query {
        return GetWorkspacesByUserIdQuery;
    }

    async handle(query: GetWorkspacesByUserIdQuery): Promise<WorkspaceByUserDto[]> {
        const result = await this.workspaceQueryRepository.findWorkspacesByUserId(query.userId);
        return result;
    }
}
