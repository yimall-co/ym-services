import { UserId } from 'iam/shared/domain/user-id';

import { User } from './user';
import { UserEmail } from './value-object/user-email';

export interface UserRepository {
    existsActiveById(id: UserId): Promise<boolean>;
    existsActiveByEmail(email: UserEmail): Promise<boolean>;
    findById(id: UserId): Promise<User>;
    findByEmail(email: UserEmail): Promise<User>;
    save(user: User): Promise<void>;
    update(userId: UserId, user: User): Promise<void>;
}
