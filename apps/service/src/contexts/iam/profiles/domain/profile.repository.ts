import { UserId } from 'iam/shared/domain/user-id';

import { Profile } from './profile';

export interface ProfileRepository {
    existsByUserId(userId: UserId): Promise<boolean>;
    save(profile: Profile): Promise<void>;
}
