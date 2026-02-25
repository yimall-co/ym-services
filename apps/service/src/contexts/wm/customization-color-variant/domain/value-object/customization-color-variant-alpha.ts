import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class CustomizationColorVariantAlpha extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsValidAlpha();
    }

    private ensureIsValidAlpha(): void {
        if (this.value < 0 || this.value > 1) {
            throw new Error('Invalid alpha value');
        }
    }
}
