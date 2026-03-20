/* eslint-disable prettier/prettier */
import { and, eq, inArray, SQL, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { permissions } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { RoleId } from 'iam/shared/domain/role-id';
import { Role } from 'iam/role/domain/role';
import { RoleRepository } from 'iam/role/domain/role.repository';
import { RoleCodeName } from 'iam/role/domain/value-object/role-code-name';

import { roles } from './drizzle/roles.table';
import { rolePermissions } from './drizzle/role-permissions.table';
import { RoleMapper } from '../mapper/role.mapper';

export class DrizzleRoleRepository
    extends DrizzleRepository<typeof roles>
    implements RoleRepository {
    protected readonly table = roles;

    async existsActiveById(id: RoleId): Promise<boolean> {
        const rows = await this.client
            .select()
            .from(this.table)
            .where(
                this.withValidRoles(
                    eq(this.table.id, id.value)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async findById(id: RoleId): Promise<Role> {
        let query = this.getBaseQuery();
        query = this.withPermissions(query);

        const [row] = await query
            .where(
                this.withValidRoles(
                    eq(this.table.id, id.value)
                ),
            )
            .limit(1);

        if (!row) {
            throw new Error('Role not found');
        }

        return RoleMapper.toDomain(row);
    }

    async findByCodeName(codeName: RoleCodeName): Promise<Role> {
        let query = this.getBaseQuery();
        query = this.withPermissions(query);

        const [row] = await query
            .where(
                this.withValidRoles(
                    eq(this.table.codeName, codeName.value)
                ),
            )

            .limit(1);

        if (!row) {
            throw new Error('Role not found');
        }

        return RoleMapper.toDomain(row);
    }

    async save(role: Role): Promise<void> {
        await this.client.transaction(async (transaction) => {
            // TODO: review this.
            const tx = this.client ?? transaction;

            const { id, ...rest } = RoleMapper.toPersistence(role);

            await tx
                .insert(this.table)
                .values(RoleMapper.toPersistence(role))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        name: rest.name,
                        codeName: rest.codeName,
                        description: rest.description,
                        version: role.getVersion().value + 1,
                        isActive: rest.isActive,
                        isRemoved: rest.isRemoved,
                        updatedAt: rest.updatedAt,
                    },
                    where: eq(this.table.version, role.getVersion().value),
                });

            const permissionsByRole = await tx
                .select({ permissionId: rolePermissions.permissionId })
                .from(rolePermissions)
                .where(eq(rolePermissions.roleId, role.getId().value));

            const current = new Set(permissionsByRole.map(p => p.permissionId));
            const desired = new Set(role.getPermissions().map(p => p.value));

            const toAdd: Array<string> = [];
            const toRemove: Array<string> = [];

            for (const permissionId of desired) {
                if (current.has(permissionId)) continue;
                toAdd.push(permissionId);
            }

            for (const permissionId of current) {
                if (desired.has(permissionId)) continue;
                toRemove.push(permissionId);
            }

            if (toAdd.length > 0) {
                await tx
                    .insert(rolePermissions)
                    .values(toAdd.map(permissionId => ({
                        roleId: role.getId().value,
                        permissionId,
                    })))
                    .onConflictDoNothing();
            }

            if (toRemove.length > 0) {
                await tx
                    .delete(rolePermissions)
                    .where(and(
                        eq(rolePermissions.roleId, role.getId().value),
                        inArray(rolePermissions.permissionId, toRemove),
                    ));
            }
        });
    }

    async remove(id: RoleId): Promise<void> {
        await this.client
            .update(this.table)
            .set({
                isRemoved: true,
            })
            .where(eq(this.table.id, id.value));
    }

    private getBaseQuery() {
        return this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                codeName: this.table.codeName,
                description: this.table.description,
                version: this.table.version,
                isActive: this.table.isActive,
                isRemoved: this.table.isRemoved,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                permissions: sql<Array<{
                    id: string,
                    name: string,
                    codeName: string,
                    description: string,
                    isActive: boolean,
                    isRemoved: boolean,
                    createdAt: Date,
                    updatedAt: Date
                }>>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${permissions.id},
                                'name', ${permissions.name},
                                'codeName', ${permissions.codeName},
                                'description', ${permissions.description},
                                'isActive', ${permissions.isActive},
                                'isRemoved', ${permissions.isRemoved},
                                'createdAt', ${permissions.createdAt},
                                'updatedAt', ${permissions.updatedAt},
                            )
                        ) filter (where ${permissions.id} is not null),
                         '[]'::json
                    )
                `,
            })
            .from(this.table)
            .groupBy(
                this.table.id,
                this.table.name,
                this.table.codeName,
                this.table.description,
                this.table.isActive,
                this.table.isRemoved,
                this.table.createdAt,
                this.table.updatedAt,
            )
            .$dynamic();
    }

    private withValidRoles(condition?: SQL) {
        return and(
            condition ? condition : undefined,
            eq(this.table.isActive, true),
            eq(this.table.isRemoved, false),
        );
    }

    private withPermissions<TQuery extends PgSelect>(query: TQuery) {
        return query
            .leftJoin(rolePermissions, eq(rolePermissions.roleId, this.table.id))
            .leftJoin(permissions, eq(permissions.id, rolePermissions.permissionId));
    }
}
