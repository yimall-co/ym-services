import { Visit } from './visit';

export interface VisitRepository {
    save(visit: Visit): Promise<void>;
}
