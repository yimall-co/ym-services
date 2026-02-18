import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CustomizationColorValue extends StringValueObject {
    constructor(value: string) {
        super(value.trim().toLowerCase());
    }
}