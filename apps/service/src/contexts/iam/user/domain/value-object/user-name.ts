import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class UserName extends StringValueObject {
    static readonly MAX_LENGTH = 80;
    static readonly MIN_LENGTH = 3;

    constructor(value: string) {
        super(value);

        this.ensureLengthIsInRange();
    }

    static create(value: string): UserName {
        return new UserName(value);
    }

    private ensureLengthIsInRange(): void {
        if (this.value.length < UserName.MIN_LENGTH || this.value.length > UserName.MAX_LENGTH) {
            throw new Error(
                `Name must be between ${UserName.MIN_LENGTH} and ${UserName.MAX_LENGTH} characters long`,
            );
        }
    }
}
