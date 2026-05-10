import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class AccountPassword extends StringValueObject {
    static readonly MIN_LENGTH = 6;

    constructor(value: string) {
        super(value);

        this.ensureMinLength();
    }

    static create(value: string): AccountPassword {
        return new AccountPassword(value);
    }

    private ensureMinLength(): void {
        if (this.value.length < AccountPassword.MIN_LENGTH) {
            throw new Error('Password must be at least 6 characters long');
        }
    }
}
