/* eslint-disable prettier/prettier */
import { and, eq, SQL } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Workspace } from 'wm/workspace/domain/workspace';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { WorkspaceSlug } from 'wm/workspace/domain/value-object/workspace-slug';

import { workspaces } from './drizzle/workspaces.table';
import { WorkspaceMapper } from '../mapper/workspace.mapper';

export class DrizzleWorkspaceRepository
    extends DrizzleRepository<typeof workspaces>
    implements WorkspaceRepository {
    protected readonly table = workspaces;

    async existsActiveById(id: WorkspaceId): Promise<boolean> {
        const rows = await this.client
            .select({ id: this.table.id })
            .from(this.table)
            .where(
                this.withValid(
                    eq(this.table.id, id.value)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async existsActiveBySlug(slug: WorkspaceSlug): Promise<boolean> {
        const rows = await this.client
            .select({ id: this.table.id })
            .from(this.table)
            .where(
                this.withValid(
                    eq(this.table.slug, slug.value)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async findById(id: WorkspaceId): Promise<Workspace> {
        const [row] = await this.client
            .select()
            .from(this.table)
            .where(
                this.withValid(
                    eq(this.table.id, id.value)
                )
            )
            .limit(1);

        if (!row) {
            throw new Error('Workspace not found');
        }

        return WorkspaceMapper.toDomain(row);
    }

    async save(workspace: Workspace): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, createdAt, ...toUpdate } = WorkspaceMapper.toPersistence(workspace);

            const workspaceVersion = workspace.getVersion().value;

            await tx
                .insert(this.table)
                .values(WorkspaceMapper.toPersistence(workspace))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...toUpdate,
                        version: workspaceVersion + 1,
                    },
                    where: eq(this.table.version, workspaceVersion),
                });
        })
    }

    async update(id: WorkspaceId, workspace: Workspace): Promise<void> {
        await this.client
            .update(this.table)
            .set(WorkspaceMapper.toPersistence(workspace))
            .where(eq(this.table.id, id.value));
    }

    private withValid(condition?: SQL) {
        return and(
            condition ? condition : undefined,
            eq(this.table.isActive, true),
            eq(this.table.isRemoved, false),
        );
    }
}
