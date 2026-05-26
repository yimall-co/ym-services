import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CampaignItemBackgroundColor extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidHexColor();
    }

    private ensureIsValidHexColor(): void {
        const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (!hexColorRegex.test(this.value)) {
            throw new Error('Invalid hex color');
        }
    }
}
