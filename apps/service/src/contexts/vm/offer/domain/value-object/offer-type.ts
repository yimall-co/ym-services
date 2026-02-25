import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export enum OfferTypes {
    PRODUCT = 'product',
    SERVICE = 'service',
}

export class OfferType extends EnumValueObject<OfferTypes> {
    constructor(value: OfferTypes) {
        super(value, Object.values(OfferTypes));
    }
}
