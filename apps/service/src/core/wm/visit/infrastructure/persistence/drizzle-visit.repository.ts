import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Visit } from 'wm/visit/domain/visit';
import { VisitRepository } from 'wm/visit/domain/visit.repository';

import { visits } from './drizzle/visits.table';
import { VisitMapper } from '../mapper/visit.mapper';

export class DrizzleVisitRepository
    extends DrizzleRepository<typeof visits>
    implements VisitRepository {
    protected readonly table = visits;

    async save(visit: Visit): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, ...rest } = VisitMapper.toPersistence(visit);

            await tx
                .insert(this.table)
                .values(VisitMapper.toPersistence(visit))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                });
        });
    }
}
