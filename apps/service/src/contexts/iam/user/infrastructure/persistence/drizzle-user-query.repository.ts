import { eq, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { accounts } from 'iam/account/infrastructure/persistence/drizzle/accounts.table';
import { workspaces } from 'wm/workspace/infrastructure/persistence/drizzle/workspaces.table';
import { UserByIdDto } from 'iam/user/application/query/get-user-by-id/dto';
import { UserByEmailDto } from 'iam/user/application/query/get-user-by-email/dto';
import { UserQueryRepository } from 'iam/user/application/query/user-query.repository';

import { users } from './drizzle/users.table';

export class DrizzleUserQueryRepository
    extends DrizzleRepository<typeof users>
    implements UserQueryRepository {
    protected readonly table = users;

    async findById(id: string): Promise<UserByIdDto> {
        throw new Error('Method not implemented.');
    }

    async findByEmail(email: string): Promise<UserByEmailDto | null> {
        let query = this.client
            .select({
                id: this.table.id,
                email: this.table.email,
                accounts: sql<UserByEmailDto['accounts']>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${accounts.id},
                                'accountId', ${accounts.accountId},
                                'providerId', ${accounts.providerId},
                                'scope', ${accounts.scope},
                                'password', ${accounts.password}
                            ) 
                        ) filter (where ${accounts.id} is not null),
                        '[]'::json
                    )
                `,
                workspaces: sql<UserByEmailDto['workspaces']>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'workspaceId', ${workspaces.id}
                            )
                        ) filter (where ${workspaces.id} is not null),
                         '[]'::json
                    )
                `,
            })
            .from(this.table)
            .$dynamic();

        query = this.withAccounts(query);
        query = this.withWorkspaces(query);

        query = query
            .where(eq(this.table.email, email))
            .groupBy(this.table.id, accounts.id, workspaces.id)
            .limit(1);

        const [row] = await query;

        return row ?? null;
    }

    private withAccounts<T extends PgSelect>(query: T) {
        return query.innerJoin(accounts, eq(accounts.userId, this.table.id));
    }

    private withWorkspaces<T extends PgSelect>(query: T) {
        return query.leftJoin(workspaces, eq(workspaces.ownerId, this.table.id));
    }
}
