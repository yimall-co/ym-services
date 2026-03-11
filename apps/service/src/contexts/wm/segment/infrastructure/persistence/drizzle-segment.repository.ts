import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';
import { Segment } from 'wm/segment/domain/segment';
import { SegmentRepository } from 'wm/segment/domain/segment.repository';

import { segments } from './drizzle/segments.table';

export class DrizzleSegmentRepository
    extends DrizzleRepository<typeof segments>
    implements SegmentRepository {
    protected readonly table = segments;

    async save(segment: Segment): Promise<void> {
        await this.client.insert(this.table).values(segment.toPrimitives());
    }
}
