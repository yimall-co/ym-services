import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ProfileRepository } from 'iam/profiles/domain/profile.repository';
import { ProfileRepositoryScope } from 'iam/profiles/application/profile.repository-scope';
import { ProfileQueryRepository } from 'iam/profiles/application/query/profile-query.repository';

import { DrizzleProfileRepository } from './drizzle-profile.repository';

export class DrizzleProfileRepositoryScope implements ProfileRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getProfileRepository(): ProfileRepository {
        return new DrizzleProfileRepository(this.db);
    }

    getProfileQueryRepository(): ProfileQueryRepository {
        throw new Error('Method not implemented.');
    }
}
