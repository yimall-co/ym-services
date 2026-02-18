import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class SegmentDescription extends StringValueObject {
    private readonly MAX_LENGTH = 500;

    constructor(value: string) {
        super(value);

        this.ensureIsValidLength();
    }

    private ensureIsValidLength(): void {
        if (this.value.length > this.MAX_LENGTH) {
            throw new Error('Description is too long');
        }
    }
}