import { PermissionRepository } from 'core/iam/permission/domain/permission.repository';

import { RoleRepository } from '../domain/role.repository';

export interface RoleRepositoryScope {
    getRoleRepository(): RoleRepository;
    getPermissionRepository(): PermissionRepository;
}
