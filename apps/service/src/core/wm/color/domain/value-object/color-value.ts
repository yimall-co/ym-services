import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { ColorVariant, colorVariants } from '../enum/color-variants';

export class ColorValue extends EnumValueObject<ColorVariant> {
    constructor(value: ColorVariant) {
        super(value, Object.values(colorVariants));
    }

    static fromValue(value: string) {
        for (const variant of Object.values(colorVariants)) {
            if (variant === value) {
                return new ColorValue(variant);
            }
        }

        throw new Error(`Invalid color value: ${value}`);
    }
}
