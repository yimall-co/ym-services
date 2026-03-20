import { PermissionRepository } from 'iam/permission/domain/permission.repository';

import { PermissionQueryRepository } from './query/permission-query.repository';

export interface PermissionRepositoryScope {
    getPermissionRepository(): PermissionRepository;
    getPermissionQueryRepository(): PermissionQueryRepository;
}
