import { UserByIdDto } from './get-user-by-id/dto';
import { UserByEmailDto } from './get-user-by-email/dto';
import { UserInfoByIdDto } from './get-user-info-by-id/dto';

export interface UserQueryRepository {
    findById(id: string): Promise<UserByIdDto>;
    findByEmail(email: string): Promise<UserByEmailDto>;
    findInfoById(id: string): Promise<UserInfoByIdDto>;
}
