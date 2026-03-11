import { UserByIdDto } from './get-user-by-id/get-user-by-id.dto';
import { UserByEmailDto } from './get-user-by-email/get-user-by-email.dto';

export interface UserQueryRepository {
    findById(id: string): Promise<UserByIdDto>;
    findByEmail(email: string): Promise<UserByEmailDto | null>;
}
