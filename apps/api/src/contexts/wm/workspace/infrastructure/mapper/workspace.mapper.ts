import { Workspace } from "wm/workspace/domain/workspace";
import { workspaces } from "wm/workspace/infrastructure/persistence/drizzle/workspaces.table";

export class WorkspaceMapper {
    static toDomain(row: typeof workspaces.$inferSelect): Workspace {
        return Workspace.fromPrimitives({
            id: row.id,
            name: row.name,
            slug: row.slug,
            description: row.description ?? '',
            tin: row.tin ?? '',
            isVerified: row.isVerified ?? false,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            segmentId: row.segmentId,
            ownerId: row.ownerId,
        });
    }

    static toPersistence(workspace: Workspace): typeof workspaces.$inferInsert {
        const primitives = workspace.toPrimitives();

        return {
            ...primitives,
            description: primitives.description || null,
            tin: primitives.tin || null,
        };
    }
}