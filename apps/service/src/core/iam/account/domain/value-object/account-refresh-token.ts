import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class AccountRefreshToken extends StringValueObject {
    static readonly MIN_LENGTH = 10;

    constructor(value: string) {
        super(value);

        this.ensureIsValidMinLength();
    }

    static create(value: string): AccountRefreshToken {
        return new AccountRefreshToken(value);
    }

    static none(): AccountRefreshToken {
        return new AccountRefreshToken('');
    }

    private ensureIsValidMinLength(): void {
        if (this.value.length < AccountRefreshToken.MIN_LENGTH) {
            throw new Error('Account refresh token is too short');
        }
    }
}
