import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ProfileRepository } from 'core/iam/profiles/domain/profile.repository';
import { ProfileRepositoryScope } from 'core/iam/profiles/application/profile.repository-scope';
import { ProfileQueryRepository } from 'core/iam/profiles/application/query/profile-query.repository';

import { DrizzleProfileRepository } from './drizzle-profile.repository';

export class DrizzleProfileRepositoryScope implements ProfileRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            Schema
        >,
    ) { }

    getProfileRepository(): ProfileRepository {
        return new DrizzleProfileRepository(this.db);
    }

    getProfileQueryRepository(): ProfileQueryRepository {
        throw new Error('Method not implemented.');
    }
}
