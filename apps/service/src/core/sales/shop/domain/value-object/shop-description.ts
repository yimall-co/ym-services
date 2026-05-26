import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class ShopDescription extends StringValueObject {
    static readonly MAX_LENGTH = 2000;

    constructor(value: string) {
        super(value);

        this.ensureLengthIsLessThan();
    }

    private ensureLengthIsLessThan(): void {
        if (this.value.length > ShopDescription.MAX_LENGTH) {
            throw new Error(
                `Shop description must be less than ${ShopDescription.MAX_LENGTH} characters`,
            );
        }
    }
}
