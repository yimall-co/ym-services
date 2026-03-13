import { StringValueObject } from "shared/domain/value-object/string.value-object";

export class CategoryDescription extends StringValueObject {
    static MAX_LENGTH: number = 250;

    constructor(value: string) {
        super(value);

        this.ensureIsValidLength();
    }

    private ensureIsValidLength(): void {
        if (this.value.length > CategoryDescription.MAX_LENGTH) {
            throw new Error('Invalid description length');
        }
    }
}