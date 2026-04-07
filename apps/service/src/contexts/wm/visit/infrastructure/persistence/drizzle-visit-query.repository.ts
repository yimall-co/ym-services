import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { VisitQueryRepository } from 'wm/visit/application/query/visit-query.repository';

import { visits } from './drizzle/visits.table';

export class DrizzleVisitQueryRepository
    extends DrizzleRepository<typeof visits>
    implements VisitQueryRepository {
    protected readonly table = visits;

    findOneByWorkspace(workspaceId: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
