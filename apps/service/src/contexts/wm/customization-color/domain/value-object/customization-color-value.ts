import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { ColorValue, colorValues } from '../enum/color-values';

export class CustomizationColorValue extends EnumValueObject<ColorValue> {
    constructor(value: ColorValue) {
        super(value, Object.values(colorValues));
    }
}
