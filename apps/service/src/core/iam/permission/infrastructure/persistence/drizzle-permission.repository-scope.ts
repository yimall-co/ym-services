import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { PermissionRepository } from 'core/iam/permission/domain/permission.repository';
import { PermissionRepositoryScope } from 'core/iam/permission/application/permission.repository-scope';
import { PermissionQueryRepository } from 'core/iam/permission/application/query/permission-query.repository';

import { DrizzlePermissionRepository } from './drizzle-permission.repository';

export class DrizzlePermissionRepositoryScope implements PermissionRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getPermissionRepository(): PermissionRepository {
        return new DrizzlePermissionRepository(this.db);
    }

    getPermissionQueryRepository(): PermissionQueryRepository {
        throw new Error('Method not implemented.');
    }
}
