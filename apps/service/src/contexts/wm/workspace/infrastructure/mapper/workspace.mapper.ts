import { Workspace } from 'wm/workspace/domain/workspace';

import { workspaces } from '../persistence/drizzle/workspaces.table';

export class WorkspaceMapper {
    static toDomain(primitives: typeof workspaces.$inferSelect): Workspace {
        return Workspace.fromPrimitives({
            ...primitives,
            description: primitives.description ?? '',
            tin: primitives.tin ?? '',
            isVerified: primitives.isVerified ?? false,
            isActive: primitives.isActive ?? true,
        });
    }

    static toPersistence(workspace: Workspace): typeof workspaces.$inferInsert {
        const primitives = workspace.toPrimitives();

        return {
            ...primitives,
            version: primitives.version ?? 0,
            description: primitives.description ?? null,
            tin: primitives.tin ?? null,
        };
    }
}
