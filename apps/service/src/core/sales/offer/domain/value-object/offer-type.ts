import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { offerTypes, OfferTypes } from '../enum/offer-types';

export class OfferType extends EnumValueObject<OfferTypes> {
    constructor(value: OfferTypes) {
        super(value, Object.values(offerTypes));
    }
}
