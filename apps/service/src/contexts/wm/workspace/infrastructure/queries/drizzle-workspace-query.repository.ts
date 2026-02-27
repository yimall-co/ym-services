/* eslint-disable @typescript-eslint/no-unsafe-call */
import { eq } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';
import { WorkspaceByIdDto } from 'wm/workspace/application/query/get-workspace-by-id/get-workspace-by-id.dto';
import { WorkspaceQueryRepository } from 'wm/workspace/application/query/get-workspace-by-id/workspace.query.repository';
import { users } from 'iam/user/infrastructure/persistence/drizzle/users.table';

import { workspaces } from '../persistence/drizzle/workspaces.table';

export class DrizzleWorkspaceQueryRepository
    extends DrizzleRepository<typeof workspaces>
    implements WorkspaceQueryRepository {
    protected readonly table = workspaces;

    async findById(id: string): Promise<WorkspaceByIdDto | null> {
        const [row] = await this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                description: this.table.description,
                tin: this.table.tin,
                segmentId: this.table.segmentId,
                ownerId: this.table.ownerId,
                owner: {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                },
            })
            .from(this.table)
            .where(eq(this.table.id, id))
            .innerJoin(users, eq(users.id, this.table.ownerId))
            .limit(1);

        return row ?? null;
    }
}
