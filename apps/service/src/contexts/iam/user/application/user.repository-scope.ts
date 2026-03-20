import { RoleRepository } from 'iam/role/domain/role.repository';

import { UserRepository } from '../domain/user.repository';
import { UserQueryRepository } from './query/user-query.repository';

export interface UserRepositoryScope {
    getUserRepository(): UserRepository;
    getUserQueryRepository(): UserQueryRepository;
    getRoleRepository(): RoleRepository;
}
