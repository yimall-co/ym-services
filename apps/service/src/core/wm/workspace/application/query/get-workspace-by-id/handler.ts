import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { WorkspaceByIdDto } from './dto';
import { GetWorkspaceByIdQuery } from './query';
import { WorkspaceQueryRepository } from '../workspace-query.repository';

export class GetWorkspaceByIdQueryHandler implements QueryHandler<
    GetWorkspaceByIdQuery,
    WorkspaceByIdDto
> {
    constructor(private readonly workspaceQueryRepository: WorkspaceQueryRepository) { }

    subscribedTo(): Query {
        return GetWorkspaceByIdQuery;
    }

    async handle(query: GetWorkspaceByIdQuery): Promise<WorkspaceByIdDto> {
        const workspace = await this.workspaceQueryRepository.findById(query.id);
        if (!workspace) {
            throw new Error('Workspace not found');
        }

        return workspace;
    }
}
