import { StringValueObject } from "shared/domain/value-object/string.value-object";

export class ShopDescription extends StringValueObject {
    private readonly MAX_LENGTH = 500;

    constructor(value: string) {
        super(value);

        this.ensureLengthIsLessThan();
    }

    private ensureLengthIsLessThan(): void {
        if (this.value.length > this.MAX_LENGTH) {
            throw new Error(`Shop description must be less than ${this.MAX_LENGTH} characters`);
        }
    }
}