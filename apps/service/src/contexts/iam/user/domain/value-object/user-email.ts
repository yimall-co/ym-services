import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class UserEmail extends StringValueObject {
    static readonly MAX_LENGTH = 255;
    static readonly MIN_LENGTH = 3;

    constructor(value: string) {
        super(value);

        this.ensureLengthIsInRange();
        this.ensureIsValidEmail();
    }

    static create(value: string): UserEmail {
        return new UserEmail(value);
    }

    private ensureLengthIsInRange(): void {
        if (this.value.length < UserEmail.MIN_LENGTH || this.value.length > UserEmail.MAX_LENGTH) {
            throw new Error(
                `Email must be between ${UserEmail.MIN_LENGTH} and ${UserEmail.MAX_LENGTH} characters long`,
            );
        }
    }

    private ensureIsValidEmail(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            throw new Error('Invalid email format');
        }
    }
}
