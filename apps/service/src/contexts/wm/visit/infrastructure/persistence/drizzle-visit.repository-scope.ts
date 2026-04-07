import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { VisitRepository } from 'wm/visit/domain/visit.repository';
import { VisitRepositoryScope } from 'wm/visit/application/visit.repository-scope';
import { VisitQueryRepository } from 'wm/visit/application/query/visit-query.repository';

import { DrizzleVisitRepository } from './drizzle-visit.repository';
import { DrizzleVisitQueryRepository } from './drizzle-visit-query.repository';

export class DrizzleVisitRepositoryScope implements VisitRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getVisitRepository(): VisitRepository {
        return new DrizzleVisitRepository(this.db);
    }

    getVisitQueryRepository(): VisitQueryRepository {
        return new DrizzleVisitQueryRepository(this.db);
    }
}
