import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export const colorValue = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    BACKGROUND: 'background',
    FOREGROUND: 'foreground',
    BACKGROUND_DARK: 'background_dark',
    FOREGROUND_DARK: 'foreground_dark',
} as const;

export type ColorValue = (typeof colorValue)[keyof typeof colorValue];

export class CustomizationColorValue extends EnumValueObject<ColorValue> {
    constructor(value: ColorValue) {
        super(value, Object.values(colorValue));
    }
}
