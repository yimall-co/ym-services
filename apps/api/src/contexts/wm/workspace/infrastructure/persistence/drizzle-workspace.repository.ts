import { eq } from 'drizzle-orm';

import { WorkspaceId } from "wm/shared/domain/workspace-id";
import { Workspace } from "wm/workspace/domain/workspace";
import { WorkspaceRepository } from "wm/workspace/domain/workspace.repository";
import { DrizzleRepository } from "shared/infrastructure/persistence/drizzle/drizzle.repository";

import { workspaces } from "./drizzle/workspaces.table";
import { WorkspaceMapper } from '../mapper/workspace.mapper';

export class DrizzleWorkspaceRepository extends DrizzleRepository<typeof workspaces> implements WorkspaceRepository {
    protected readonly table = workspaces;

    async findAll(): Promise<Array<Workspace>> {
        const rows = await this.client
            .select()
            .from(this.table);

        return rows.map(WorkspaceMapper.toDomain);
    }

    async findById(id: WorkspaceId): Promise<Workspace> {
        const [row] = await this.client
            .select()
            .from(this.table)
            .where(eq(this.table.id, id.value))
            .limit(1);

        return WorkspaceMapper.toDomain(row);
    }

    async save(workspace: Workspace): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update(workspace: Workspace): Promise<void> {
        throw new Error("Method not implemented.");
    }
}