import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { fonts, Font } from '../enum/fonts';

export class CustomizationFont extends EnumValueObject<Font> {
    constructor(value: Font) {
        super(value, Object.values(fonts));
    }

    static fromValue(value: string): CustomizationFont {
        for (const fontValue of Object.values(fonts)) {
            if (fontValue === value) {
                return new CustomizationFont(fontValue);
            }
        }

        throw new Error('Invalid font value');
    }
}
