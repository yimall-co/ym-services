import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class AccountAccessToken extends StringValueObject {
    static readonly MIN_LENGTH = 10;

    constructor(value: string) {
        super(value);

        this.ensureIsValidMinLength();
    }

    static create(value: string): AccountAccessToken {
        return new AccountAccessToken(value);
    }

    static none(): AccountAccessToken {
        return new AccountAccessToken('');
    }

    private ensureIsValidMinLength(): void {
        if (this.value.length < AccountAccessToken.MIN_LENGTH) {
            throw new Error('Account access token is too short');
        }
    }
}
