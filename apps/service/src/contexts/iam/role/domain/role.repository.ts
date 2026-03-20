import { RoleId } from 'iam/shared/domain/role-id';

import { Role } from './role';
import { RoleCodeName } from './value-object/role-code-name';

export interface RoleRepository {
    existsActiveById(id: RoleId): Promise<boolean>;
    findById(id: RoleId): Promise<Role>;
    findByCodeName(codeName: RoleCodeName): Promise<Role>;
    save(role: Role): Promise<void>;
    remove(id: RoleId): Promise<void>;
}
