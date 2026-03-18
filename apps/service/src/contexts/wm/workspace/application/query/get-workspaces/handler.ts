import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { WorkspaceDto } from './dto';
import { GetWorkspacesQuery } from './query';
import { WorkspaceQueryRepository } from '../workspace-query.repository';

export class GetWorkspacesQueryHandler implements QueryHandler<
    GetWorkspacesQuery,
    Array<WorkspaceDto>
> {
    constructor(private readonly workspaceQueryRepository: WorkspaceQueryRepository) { }

    subscribedTo(): Query {
        return GetWorkspacesQuery;
    }

    async handle(): Promise<Array<WorkspaceDto>> {
        const workspaces = await this.workspaceQueryRepository.findAll();
        return workspaces;
    }
}
