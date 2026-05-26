import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UserRepository } from 'core/iam/user/domain/user.repository';
import { RoleRepository } from 'core/iam/role/domain/role.repository';
import { AccountRepository } from 'core/iam/account/domain/account.repository';
import { ProfileRepository } from 'core/iam/profiles/domain/profile.repository';
import { UserQueryRepository } from 'core/iam/user/application/query/user-query.repository';
import { UserRepositoryScope } from 'core/iam/user/application/user.repository-scope';
import { DrizzleAccountRepository } from 'core/iam/account/infrastructure/persistence/drizzle-account.repository';
import { DrizzleRoleRepository } from 'core/iam/role/infrastructure/persistence/drizzle-role.repository';
import { DrizzleProfileRepository } from 'core/iam/profiles/infrastructure/persistence/drizzle-profile.repository';

import { DrizzleUserRepository } from './drizzle-user.repository';
import { DrizzleUserQueryRepository } from './drizzle-user-query.repository';

export class DrizzleUserRepositoryScope implements UserRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getAccountRepository(): AccountRepository {
        return new DrizzleAccountRepository(this.db);
    }

    getUserRepository(): UserRepository {
        return new DrizzleUserRepository(this.db);
    }

    getUserQueryRepository(): UserQueryRepository {
        return new DrizzleUserQueryRepository(this.db);
    }

    getRoleRepository(): RoleRepository {
        return new DrizzleRoleRepository(this.db);
    }

    getProfileRepository(): ProfileRepository {
        return new DrizzleProfileRepository(this.db);
    }
}
