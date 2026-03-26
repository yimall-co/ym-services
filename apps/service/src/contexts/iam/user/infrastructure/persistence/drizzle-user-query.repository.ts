/* eslint-disable prettier/prettier */
import { and, eq, SQL, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { accounts, profiles, workspaces } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { UserNotFound } from 'iam/user/domain/error/user-not-found';
import { UserByIdDto } from 'iam/user/application/query/get-user-by-id/dto';
import { UserByEmailDto } from 'iam/user/application/query/get-user-by-email/dto';
import { UserInfoByIdDto } from 'iam/user/application/query/get-user-info-by-id/dto';
import { UserQueryRepository } from 'iam/user/application/query/user-query.repository';

import { users } from './drizzle/users.table';

export class DrizzleUserQueryRepository
    extends DrizzleRepository<typeof users>
    implements UserQueryRepository {
    protected readonly table = users;

    async findById(id: string): Promise<UserByIdDto> {
        const query = this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                image: this.table.image,
                email: this.table.email,
                emailVerified: this.table.emailVerified,
            })
            .from(this.table)
            .$dynamic();

        // query = this.withProfile(query);

        const [row] = await query
            .where(
                this.withValid(
                    eq(this.table.id, id)
                )
            )
            .limit(1);

        if (!row) {
            throw new UserNotFound();
        }

        return row;
    }

    async findInfoById(id: string): Promise<UserInfoByIdDto> {
        let query = this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                email: this.table.email,
                emailVerified: this.table.emailVerified,
                image: this.table.image,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                profile: {
                    gender: profiles.gender,
                    customGender: profiles.customGender,
                    pronoun: profiles.pronouns,
                    customPronoun: profiles.customPronouns,
                    birthdate: profiles.birthdate,
                    newsLetter: profiles.newsLetter,
                },
            })
            .from(this.table)
            .$dynamic();

        query = this.withProfile(query);

        const [row] = await query
            .where(
                this.withValid(
                    eq(this.table.id, id)
                )
            )
            .limit(1);

        if (!row) {
            throw new UserNotFound();
        }

        return row;
    }

    async findByEmail(email: string): Promise<UserByEmailDto> {
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

        const [row] = await query
            .where(
                this.withValid(
                    eq(this.table.email, email)
                )
            )
            .groupBy(this.table.id, accounts.id, workspaces.id)
            .limit(1);

        if (!row) {
            throw new UserNotFound();
        }

        return row;
    }

    private withValid(condition?: SQL) {
        return and(
            condition ? condition : undefined,
            eq(this.table.isActive, true),
            eq(this.table.isRemoved, false),
        );
    }

    private withProfile<T extends PgSelect>(query: T) {
        return query.innerJoin(profiles, eq(profiles.userId, this.table.id));
    }

    private withAccounts<T extends PgSelect>(query: T) {
        return query.innerJoin(accounts, eq(accounts.userId, this.table.id));
    }

    private withWorkspaces<T extends PgSelect>(query: T) {
        return query.leftJoin(workspaces, eq(workspaces.ownerId, this.table.id));
    }
}
