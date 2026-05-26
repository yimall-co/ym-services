import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { accountProviders, AccountProviders } from '../enum/account-providers';

export class AccountProvider extends EnumValueObject<AccountProviders> {
    constructor(value: AccountProviders) {
        super(value, Object.values(accountProviders));
    }

    static create(value: AccountProviders): AccountProvider {
        return new AccountProvider(value);
    }

    static fromValue(value: string): AccountProvider {
        for (const providerValue of Object.values(accountProviders)) {
            if (providerValue === value) {
                return new AccountProvider(value);
            }
        }

        throw new Error('Invalid account provider');
    }

    static credential(): AccountProvider {
        return new AccountProvider(accountProviders.CREDENTIAL);
    }
}
