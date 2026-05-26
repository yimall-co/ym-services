import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class AccountIdToken extends StringValueObject {
    static readonly MIN_LENGTH = 10;

    constructor(value: string) {
        super(value);

        this.ensureIsValidMinLength();
    }

    static none(): AccountIdToken {
        return new AccountIdToken('');
    }

    private ensureIsValidMinLength(): void {
        if (this.value.length < AccountIdToken.MIN_LENGTH) {
            throw new Error('Account id token is too short');
        }
    }
}
