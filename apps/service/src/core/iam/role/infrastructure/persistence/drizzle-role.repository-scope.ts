import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { RoleRepository } from 'core/iam/role/domain/role.repository';
import { PermissionRepository } from 'core/iam/permission/domain/permission.repository';
import { RoleRepositoryScope } from 'core/iam/role/application/role.repository-scope';
import { DrizzlePermissionRepository } from 'core/iam/permission/infrastructure/persistence/drizzle-permission.repository';

import { DrizzleRoleRepository } from './drizzle-role.repository';

export class DrizzleRoleRepositoryScope implements RoleRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            Schema
        >,
    ) { }

    getRoleRepository(): RoleRepository {
        return new DrizzleRoleRepository(this.db);
    }

    getPermissionRepository(): PermissionRepository {
        return new DrizzlePermissionRepository(this.db);
    }
}
