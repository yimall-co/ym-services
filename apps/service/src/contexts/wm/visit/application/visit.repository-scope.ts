import { VisitRepository } from '../domain/visit.repository';
import { VisitQueryRepository } from './query/visit-query.repository';

export interface VisitRepositoryScope {
    getVisitRepository(): VisitRepository;
    getVisitQueryRepository(): VisitQueryRepository;
}
