import { ProfileRepository } from '../domain/profile.repository';
import { ProfileQueryRepository } from './query/profile-query.repository';

export interface ProfileRepositoryScope {
    getProfileRepository(): ProfileRepository;
    getProfileQueryRepository(): ProfileQueryRepository;
}
