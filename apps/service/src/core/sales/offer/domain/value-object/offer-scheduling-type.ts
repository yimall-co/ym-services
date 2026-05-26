import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { schedulingTypes, SchedulingTypes } from '../enum/scheduling-types';

export class OfferSchedulingType extends EnumValueObject<SchedulingTypes> {
    constructor(value: SchedulingTypes) {
        super(value, Object.values(schedulingTypes));
    }
}
