/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { GetWorkspaceByIdQuery } from 'wm/workspace/application/query/get-workspace-by-id.query';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';

import { WorkspaceResult } from '../workspace-result';

export class GetWorkspaceByIdQueryHandler implements QueryHandler<
    GetWorkspaceByIdQuery,
    WorkspaceResult
> {
    constructor(private readonly workspaceRepository: WorkspaceRepository) { }

    subscribedTo(): Query {
        return GetWorkspaceByIdQuery;
    }

    async handle(query: GetWorkspaceByIdQuery): Promise<WorkspaceResult> {
        const workspaceId = new WorkspaceId(query.id);
        const workspace = await this.workspaceRepository.findById(workspaceId);
        return new WorkspaceResult(workspace);
    }
}
