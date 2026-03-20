/* eslint-disable prettier/prettier */
import { and, eq, SQL } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { PermissionId } from 'iam/shared/domain/permission-id';
import { Permission } from 'iam/permission/domain/permission';
import { PermissionCodeName } from 'iam/permission/domain/value-object/permission-code-name';
import { PermissionRepository } from 'iam/permission/domain/permission.repository';

import { permissions } from './drizzle/permissions.table';
import { PermissionMapper } from '../mapper/permission.mapper';

export class DrizzlePermissionRepository
    extends DrizzleRepository<typeof permissions>
    implements PermissionRepository {
    protected readonly table = permissions;

    async existsActiveById(id: PermissionId): Promise<boolean> {
        const rows = await this.client
            .select()
            .from(this.table)
            .where(
                this.withValidPermissions(
                    eq(this.table.id, id.value)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async existsActiveByCodeName(codeName: PermissionCodeName): Promise<boolean> {
        const rows = await this.client
            .select()
            .from(this.table)
            .where(
                this.withValidPermissions(
                    eq(this.table.codeName, codeName.value)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async findById(id: PermissionId): Promise<Permission> {
        const [row] = await this.client
            .select()
            .from(this.table)
            .where(
                this.withValidPermissions(
                    eq(this.table.id, id.value)
                ),
            )
            .limit(1);

        if (!row) {
            throw new Error('Permission not found');
        }

        return PermissionMapper.toDomain(row);
    }

    async findByCodeName(codeName: PermissionCodeName): Promise<Permission> {
        const [row] = await this.client
            .select()
            .from(this.table)
            .where(
                this.withValidPermissions(
                    eq(this.table.codeName, codeName.value)
                ),
            )
            .limit(1);

        if (!row) {
            throw new Error('Permission not found');
        }

        return PermissionMapper.toDomain(row);
    }

    async save(permission: Permission): Promise<void> {
        await this.client
            .insert(this.table)
            .values(PermissionMapper.toPersistence(permission))
            .onConflictDoNothing();
    }

    async remove(id: PermissionId): Promise<void> {
        await this.client
            .update(this.table)
            .set({
                isRemoved: true,
            })
            .where(eq(this.table.id, id.value));
    }

    private withValidPermissions(condition?: SQL) {
        return and(
            condition ? condition : undefined,
            eq(this.table.isActive, true),
            eq(this.table.isRemoved, false),
        );
    }
}
