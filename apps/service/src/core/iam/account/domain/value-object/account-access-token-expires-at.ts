import { DateValueObject } from 'shared/domain/value-object/date.value-object';

export class AccountAccessTokenExpiresAt extends DateValueObject {
    static readonly MIN_VALUE = new Date(Date.now() + 15 * 60 * 1000);

    constructor(value: Date) {
        super(value);

        this.ensureIsValidMinDate();
    }

    static none(): AccountAccessTokenExpiresAt {
        return new AccountAccessTokenExpiresAt(new Date(0));
    }

    private ensureIsValidMinDate(): void {
        if (this.value.getTime() < AccountAccessTokenExpiresAt.MIN_VALUE.getTime()) {
            throw new Error('Account access token expires at is too short');
        }
    }
}
