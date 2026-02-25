import { Inject, Injectable } from '@nestjs/common';

// import { QueryBus } from 'shared/domain/query-bus';
import type { QueryHandler } from 'shared/domain/query-handler';
import { WorkspacesResult } from 'wm/workspace/application/workspaces-result';
import { GetWorkspacesQuery } from 'wm/workspace/domain/get-workspaces.query';

import { GET_WORKSPACES_QUERY_HANDLER } from './adapters/workspace.adapter';

@Injectable()
export class WorkspaceService {
    constructor(
        @Inject(GET_WORKSPACES_QUERY_HANDLER)
        private readonly getWorkspacesQueryHandler: QueryHandler<
            GetWorkspacesQuery,
            WorkspacesResult
        >,
    ) { }

    async getAllWorkspaces(): Promise<Array<any>> {
        const query = new GetWorkspacesQuery();

        // await this.queryBus.ask<WorkspacesResult>(query);
        const result = await this.getWorkspacesQueryHandler.handle(query);
        const workspaces = result.workspaces.map((w) => ({ ...w }));
        return workspaces;
    }
}
