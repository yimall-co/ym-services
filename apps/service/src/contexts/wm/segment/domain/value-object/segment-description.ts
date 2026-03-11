import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class SegmentDescription extends StringValueObject {
    static readonly maxLength = 500;

    constructor(value: string) {
        super(value);

        this.ensureIsValidLength();
    }

    private ensureIsValidLength(): void {
        if (this.value.length > SegmentDescription.maxLength) {
            throw new Error('Description is too long');
        }
    }
}
