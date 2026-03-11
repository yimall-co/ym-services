import { Segment } from './segment';

export interface SegmentRepository {
    save(segment: Segment): Promise<void>;
}
