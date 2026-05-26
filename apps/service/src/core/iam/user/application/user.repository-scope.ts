import { RoleRepository } from 'core/iam/role/domain/role.repository';
import { ProfileRepository } from 'core/iam/profiles/domain/profile.repository';
import { AccountRepository } from 'core/iam/account/domain/account.repository';

import { UserRepository } from '../domain/user.repository';
import { UserQueryRepository } from './query/user-query.repository';

export interface UserRepositoryScope {
    getUserRepository(): UserRepository;
    getUserQueryRepository(): UserQueryRepository;
    getRoleRepository(): RoleRepository;
    getProfileRepository(): ProfileRepository;
    getAccountRepository(): AccountRepository;
}
