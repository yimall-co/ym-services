import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Account } from 'iam/account/domain/account';
import { AccountRepository } from 'iam/account/domain/account.repository';

import { accounts } from './drizzle/accounts.table';

export class DrizzleAccountRepository extends DrizzleRepository<typeof accounts> implements AccountRepository {
    protected readonly table = accounts;

    async save(account: Account): Promise<void> {
        await this.client.insert(this.table).values(account.toPrimitives());
    }
}
