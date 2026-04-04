import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export const fontValue = {
    INTER: 'Inter',
    POPPINS: 'Poppins',
    RALEWAY: 'Raleway',
    MONTSERRAT: 'Montserrat',
} as const;

export type FontValue = (typeof fontValue)[keyof typeof fontValue];

export class CustomizationFont extends EnumValueObject<FontValue> {
    constructor(value: FontValue) {
        super(value, Object.values(fontValue));
    }
}
