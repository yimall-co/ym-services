import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export abstract class ColorChannelValueObject extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsIntegerValue();
        this.ensureIsValidColorChannel();
    }

    private ensureIsIntegerValue(): void {
        if (!Number.isInteger(this.value)) {
            throw new Error('Invalid color channel value');
        }
    }

    private ensureIsValidColorChannel(): void {
        if (this.value < 0 || this.value > 255) {
            throw new Error('Invalid color channel value');
        }
    }
}
