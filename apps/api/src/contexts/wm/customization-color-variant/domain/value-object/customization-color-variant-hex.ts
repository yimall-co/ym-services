import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CustomizationColorVariantHex extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidHex();
    }

    private ensureIsValidHex(): void {
        const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (!hexRegex.test(this.value)) {
            throw new Error('Invalid hex color');
        }
    }
}