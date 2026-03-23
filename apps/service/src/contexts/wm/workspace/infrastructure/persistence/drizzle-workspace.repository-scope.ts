import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { WorkspaceQueryRepository } from 'wm/workspace/application/query/workspace-query.repository';
import { WorkspaceRepositoryScope } from 'wm/workspace/application/workspace.repository-scope';
import { DrizzleWorkspaceRepository } from './drizzle-workspace.repository';
import { DrizzleWorkspaceQueryRepository } from './drizzle-workspace-query.repository';

export class DrizzleWorkspaceRepositoryScope implements WorkspaceRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getWorkspaceRepository(): WorkspaceRepository {
        return new DrizzleWorkspaceRepository(this.db);
    }

    getWorkspaceQueryRepository(): WorkspaceQueryRepository {
        return new DrizzleWorkspaceQueryRepository(this.db);
    }
}
