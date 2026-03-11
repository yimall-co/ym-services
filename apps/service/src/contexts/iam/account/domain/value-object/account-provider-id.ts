import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export enum AccountProvider {
    CREDENTIAL = 'credential',
}

export class AccountProviderId extends EnumValueObject<AccountProvider> {
    constructor(value: AccountProvider) {
        super(value, Object.values(AccountProvider));
    }
}
