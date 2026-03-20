import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { PermissionRepository } from 'iam/permission/domain/permission.repository';
import { PermissionRepositoryScope } from 'iam/permission/application/permission.repository-scope';
import { PermissionQueryRepository } from 'iam/permission/application/query/permission-query.repository';

import { DrizzlePermissionRepository } from './drizzle-permission.repository';

export class DrizzlePermissionRepositoryScope implements PermissionRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getPermissionRepository(): PermissionRepository {
        return new DrizzlePermissionRepository(this.db);
    }

    getPermissionQueryRepository(): PermissionQueryRepository {
        throw new Error('Method not implemented.');
    }
}
