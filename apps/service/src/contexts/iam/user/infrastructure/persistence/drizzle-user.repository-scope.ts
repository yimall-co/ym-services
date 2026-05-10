import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UserRepository } from 'iam/user/domain/user.repository';
import { RoleRepository } from 'iam/role/domain/role.repository';
import { AccountRepository } from 'iam/account/domain/account.repository';
import { ProfileRepository } from 'iam/profiles/domain/profile.repository';
import { UserQueryRepository } from 'iam/user/application/query/user-query.repository';
import { UserRepositoryScope } from 'iam/user/application/user.repository-scope';
import { DrizzleAccountRepository } from 'iam/account/infrastructure/persistence/drizzle-account.repository';
import { DrizzleRoleRepository } from 'iam/role/infrastructure/persistence/drizzle-role.repository';
import { DrizzleProfileRepository } from 'iam/profiles/infrastructure/persistence/drizzle-profile.repository';

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
