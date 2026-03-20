import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { RoleRepository } from 'iam/role/domain/role.repository';
import { PermissionRepository } from 'iam/permission/domain/permission.repository';
import { RoleRepositoryScope } from 'iam/role/application/role.repository-scope';
import { DrizzlePermissionRepository } from 'iam/permission/infrastructure/persistence/drizzle-permission.repository';

import { DrizzleRoleRepository } from './drizzle-role.repository';

export class DrizzleRoleRepositoryScope implements RoleRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getRoleRepository(): RoleRepository {
        return new DrizzleRoleRepository(this.db);
    }

    getPermissionRepository(): PermissionRepository {
        return new DrizzlePermissionRepository(this.db);
    }
}
