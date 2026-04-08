import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { UnitOfWork } from "shared/infrastructure/unit-of-work";
import { WorkspaceMemberRepositoryScope } from "wm/workspace-member/application/workspace-member.repository-scope";
import { DrizzleWorkspaceMemberRepositoryScope } from "./drizzle-workspace-member.repository-scope";

export class DrizzleWorkspaceMemberUnitOfWork implements UnitOfWork<WorkspaceMemberRepositoryScope>{
    constructor(
        private readonly db: NodePgDatabase<
                    typeof import('shared/infrastructure/persistence/drizzle/schema')
                >
    ) { }

    withTransaction<T>(fn: (scope: WorkspaceMemberRepositoryScope) => Promise<T>): Promise<T> {
     return this.db.transaction(async (tx) => {
               const scope = new DrizzleWorkspaceMemberRepositoryScope(tx);
               const result = await fn(scope);
   
               return result;
           });
        }
}