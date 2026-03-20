import { PermissionRepository } from 'iam/permission/domain/permission.repository';

import { RoleRepository } from '../domain/role.repository';

export interface RoleRepositoryScope {
    getRoleRepository(): RoleRepository;
    getPermissionRepository(): PermissionRepository;
}
