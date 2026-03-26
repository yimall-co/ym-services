/* eslint-disable prettier/prettier */
import { and, eq, inArray, sql, SQL } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { roles, userRoles } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { User } from 'iam/user/domain/user';
import { UserRepository } from 'iam/user/domain/user.repository';
import { UserNotFound } from 'iam/user/domain/error/user-not-found';
import { UserId } from 'iam/shared/domain/user-id';
import { UserEmail } from 'iam/user/domain/value-object/user-email';

import { users } from './drizzle/users.table';
import { UserMapper } from '../mapper/user.mapper';

export class DrizzleUserRepository
    extends DrizzleRepository<typeof users>
    implements UserRepository {
    protected readonly table = users;

    async existsActiveById(id: UserId): Promise<boolean> {
        const rows = await this.client
            .select({ id: this.table.id })
            .from(this.table)
            .where(
                this.withActiveAndNotRemoved(
                    eq(this.table.id, id.value),
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async existsActiveByEmail(email: UserEmail): Promise<boolean> {
        const rows = await this.client
            .select({ id: this.table.id })
            .from(this.table)
            .where(
                this.withActiveAndNotRemoved(
                    eq(this.table.email, email.value)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async findById(id: UserId): Promise<User> {
        let query = this.getBaseQuery();
        query = this.withRoles(query);

        const [row] = await query
            .where(
                this.withActiveAndNotRemoved(
                    eq(this.table.id, id.value),
                ),
            )
            .limit(1);

        if (!row) {
            throw new UserNotFound();
        }

        return UserMapper.toDomain(row);
    }

    async findByEmail(email: UserEmail): Promise<User> {
        let query = this.getBaseQuery();
        query = this.withRoles(query);

        const [row] = await query
            .where(
                this.withActiveAndNotRemoved(
                    eq(this.table.email, email.value),
                ),
            )
            .limit(1);

        if (!row) {
            throw new UserNotFound();
        }

        return UserMapper.toDomain(row);
    }

    async save(user: User): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, email, ...rest } = UserMapper.toPersistence(user);

            await tx
                .insert(this.table)
                .values(UserMapper.toPersistence(user))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                    where: and(
                        eq(this.table.isRemoved, false),
                        eq(this.table.isActive, true),
                    ),
                });

            const rolesByUser = await tx
                .select({ roleId: userRoles.roleId })
                .from(userRoles)
                .where(eq(userRoles.userId, user.getId().value));

            const current = new Set(rolesByUser.map(r => r.roleId));
            const desired = new Set(user.getRoles().map(r => r.value));

            const toAdd: Array<string> = [];
            const toRemove: Array<string> = [];

            for (const roleId of desired) {
                if (current.has(roleId)) continue;
                toAdd.push(roleId);
            }

            for (const roleId of current) {
                if (desired.has(roleId)) continue;
                toRemove.push(roleId);
            }

            if (toAdd.length > 0) {
                await tx
                    .insert(userRoles)
                    .values(toAdd.map(roleId => ({
                        userId: user.getId().value,
                        roleId,
                    })))
                    .onConflictDoNothing();
            }

            if (toRemove.length > 0) {
                await tx
                    .delete(userRoles)
                    .where(and(
                        eq(userRoles.userId, user.getId().value),
                        inArray(userRoles.roleId, toRemove),
                    ));
            }
        });
    }

    async update(userId: UserId, user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private getBaseQuery() {
        return this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                email: this.table.email,
                emailVerified: this.table.emailVerified,
                image: this.table.image,
                isActive: this.table.isActive,
                isRemoved: this.table.isRemoved,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                roles: sql<Array<{
                    id: string,
                    name: string,
                    codeName: string,
                    description: string,
                    version: number,
                    isActive: boolean,
                    isRemoved: boolean,
                    createdAt: Date,
                    updatedAt: Date
                }>>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${roles.id},
                                'name', ${roles.name},
                                'codeName', ${roles.codeName},
                                'description', ${roles.description},
                                'version', ${roles.version},
                                'isActive', ${roles.isActive},
                                'isRemoved', ${roles.isRemoved},
                                'createdAt', ${roles.createdAt},
                                'updatedAt', ${roles.updatedAt}
                            )
                        ) filter (where ${roles.id} is not null),
                        '[]'::json
                    )
                `,
            })
            .from(this.table)
            .groupBy(
                this.table.id,
                this.table.name,
                this.table.email,
                this.table.emailVerified,
                this.table.image,
                this.table.isActive,
                this.table.isRemoved,
                this.table.createdAt,
                this.table.updatedAt,
            )
            .$dynamic();
    }

    private withActiveAndNotRemoved(condition?: SQL) {
        return and(
            condition ? condition : undefined,
            eq(this.table.isActive, true),
            eq(this.table.isRemoved, false),
        );
    }

    private withRoles<TQuery extends PgSelect>(query: TQuery) {
        return query
            .leftJoin(userRoles, eq(userRoles.userId, this.table.id))
            .leftJoin(roles, eq(roles.id, userRoles.roleId));
    }
}
