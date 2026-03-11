import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { User } from 'iam/user/domain/user';
import { UserRepository } from 'iam/user/domain/user.repository';

import { users } from './drizzle/users.table';

export class DrizzleUserRepository extends DrizzleRepository<typeof users> implements UserRepository {
    protected readonly table = users;

    async save(user: User): Promise<void> {
        await this.client.insert(this.table).values(user.toPrimitives());
    }
}
