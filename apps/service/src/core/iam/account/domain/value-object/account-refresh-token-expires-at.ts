import { DateValueObject } from 'shared/domain/value-object/date.value-object';

export class AccountRefreshTokenExpiresAt extends DateValueObject {
    static readonly MIN_VALUE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    constructor(value: Date) {
        super(value);

        this.ensureIsValidMinDate();
    }

    static none(): AccountRefreshTokenExpiresAt {
        return new AccountRefreshTokenExpiresAt(new Date(0));
    }

    private ensureIsValidMinDate(): void {
        if (this.value.getTime() < AccountRefreshTokenExpiresAt.MIN_VALUE.getTime()) {
            throw new Error('Account refresh token expires at is too short');
        }
    }
}
