import { PermissionId } from 'iam/shared/domain/permission-id';

import { Permission } from './permission';
import { PermissionCodeName } from './value-object/permission-code-name';

export interface PermissionRepository {
    existsActiveById(id: PermissionId): Promise<boolean>;
    existsActiveByCodeName(codeName: PermissionCodeName): Promise<boolean>;
    findById(id: PermissionId): Promise<Permission>;
    findByCodeName(codeName: PermissionCodeName): Promise<Permission>;
    save(permission: Permission): Promise<void>;
    remove(id: PermissionId): Promise<void>;
}
