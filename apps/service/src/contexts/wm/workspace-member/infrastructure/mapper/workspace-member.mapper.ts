import { WorkspaceMember } from "wm/workspace-member/domain/workspace-member";
import { workspaceMembers } from "../persistence/drizzle/workspace-member.table";

export class WorkspaceMemberMapper { 

    static toDomain(primitives: typeof workspaceMembers.$inferSelect): WorkspaceMember {
        return WorkspaceMember.fromPrimitives({
            ...primitives
        });
    }

    static toPersistence(workspaceMember: WorkspaceMember): typeof workspaceMembers.$inferInsert {
        const primitives = workspaceMember.toPrimitives();

        return {
            ...primitives
        };
    }

}